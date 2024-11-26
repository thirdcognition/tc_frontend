"use client";

import AppPageContainer from "@/components/app-page-container";
import { redirect } from "next/navigation";
import getSession from "@/lib/utils/session/getClientSession.js";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User as UserData } from "@/lib_js/models/UserInterfaces";
import { createClient } from "@/lib/utils/supabase/client";

export default function MyJourneysPage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();

            if (!session.supaUser) {
                return redirect("/sign-in");
            }

            const userModel = session.userModel;
            setUserData(userModel); // Assuming userModel is an instance of UserData
        };

        fetchData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userData && userData.model) {
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get("name") as string;

            if (userData.profile) {
                userData.profile.name = name;
            }

            if (imageFile) {
                const supabase = createClient();
                const { error } = await supabase.storage
                    .from("profile-pictures")
                    .upload(`public/${imageFile.name}`, imageFile);

                if (error) {
                    console.error("Error uploading image:", error);
                    return;
                }

                const imageUrl = supabase.storage
                    .from("profile-pictures")
                    .getPublicUrl(`public/${imageFile.name}`).data.publicUrl;

                userData.profile.profilePicture = imageUrl;
            }

            console.log(userData);
            await userData.model.saveAllToSupabase();
            // Optionally redirect or show a success message
        }
    };

    return (
        <AppPageContainer
            headerContent={
                <h1 className="text-2xl font-semibold text-primary">
                    My Profile
                </h1>
            }
        >
            <Card className="mx-auto max-w-2xl p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">
                            Edit Your Profile
                        </h2>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={userData?.profile?.name || ""}
                                placeholder="Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profilePicture">
                                Profile Picture
                            </Label>
                            <Input
                                id="profilePicture"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <p className="text-sm text-gray-500">
                                Supported file types: JPEG, PNG, GIF
                            </p>
                        </div>
                    </div>
                    <Button className="w-full" size="lg" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Card>
        </AppPageContainer>
    );
}
