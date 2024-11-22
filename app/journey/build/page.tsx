import AppPageContainer from "@/components/app-page-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <AppPageContainer
            headerContent={
                <h1 className="text-2xl font-semibold text-primary">
                    Journey Creation Wizard
                </h1>
            }
        >
            <Card className="mx-auto max-w-2xl p-6">
                <form className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">
                            Role & Organization Description
                        </h2>
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Textarea
                                id="jobTitle"
                                placeholder="i.e. Account Manager"
                                className="min-h-[50px] resize-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="roleDescription">
                                Role Description
                            </Label>
                            <Textarea
                                id="roleDescription"
                                placeholder="Describe the role in detail or post a job description"
                                className="min-h-[250px]"
                            />
                        </div>
                    </div>
                    <Button className="w-full" size="lg">
                        Create
                    </Button>
                </form>
            </Card>
        </AppPageContainer>
        // <>
        //     <Hero />
        // </>
    );
}
