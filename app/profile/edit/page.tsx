"use client";
import md5 from "crypto-js/md5";
import AppPageContainer from "@/components/app-page-container";
import { redirect } from "next/navigation";
import getSession from "@/lib/utils/session/getClientSession.js";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User as UserData } from "@/lib_js/models/UserInterfaces";
import UserSession from "@/lib/utils/session/userSession";

export default function MyJourneysPage() {
    const [session, setSession] = useState<UserSession | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [profileName, setProfileName] = useState<string | null>(null);

    const handleProfileChanges = (model: UserData) => {
        console.log("Profile changes", model);
        if (model.profile?.profilePicture) {
            setProfilePicture(model.profile.profilePicture);
        }
        if (model.profile?.name) {
            setProfileName(model.profile.name);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const newSession = await getSession();
            setSession(newSession);

            if (!newSession?.supaUser) {
                return redirect("/sign-in");
            }

            const userModel = newSession.userModel;
            setUserData(userModel); // Assuming userModel is an instance of UserData
            userModel.listen(handleProfileChanges);
            handleProfileChanges(userModel);
        };

        fetchData();
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (session && userData && userData.model) {
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get("name") as string;

            if (userData.profile) {
                userData.profile.name = name;
            }

            if (imageFile) {
                const { data, error } = await session.supabase.storage
                    .from("avatars")
                    .upload(
                        `profile_pictures/${md5(userData.authId + imageFile.name)}`,
                        imageFile,
                        {
                            upsert: true
                        }
                    );

                if (error) {
                    console.error("Error uploading image:", error);
                    return;
                }

                const imageUrl = session.supabase.storage
                    .from("avatars")
                    .getPublicUrl(data.path).data.publicUrl;

                userData.profile.profilePicture = imageUrl;
                userData.profile.notifyListeners();
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
                                defaultValue={profileName || ""}
                                placeholder="Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profilePicture">
                                Profile Picture
                            </Label>
                            {profilePicture && (
                                <img
                                    src={profilePicture}
                                    alt="Profile Picture"
                                    className="w-32 h-32 object-cover rounded-full"
                                />
                            )}
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
