import AppPageContainer from "@/components/app-page-container";
// import { createClient } from "@/lib/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
// import { User as UserModel } from "@/lib_js/models/user.js";
import getSession from "@/lib/utils/session/getServerSession.js";

export default async function MyJourneysPage() {
    // const supabase = await createClient();

    // const {
    //     data: { user: supaUser }
    // } = await supabase.auth.getUser();

    const session = await getSession();

    if (!session.supaUser) {
        return redirect("/sign-in");
    }

    const userModel = session.userModel; //new UserModel(supabase, supaUser.id);
    // await userModel.initialize();

    return (
        <AppPageContainer
            headerContent={
                <h1 className="text-2xl font-semibold text-primary">
                    Protected page
                </h1>
            }
        >
            <div className="flex-1 w-full flex flex-col gap-12">
                <div className="w-full">
                    <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                        <InfoIcon size="16" strokeWidth={2} />
                        This is a protected page that you can only see as an
                        authenticated user
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <h2 className="font-bold text-2xl mb-4">
                        Your user details
                    </h2>
                    <pre className="text-xs font-mono p-3 rounded border overflow-auto">
                        {JSON.stringify(userModel, null, 2)}
                    </pre>
                </div>
            </div>
        </AppPageContainer>
    );
}
