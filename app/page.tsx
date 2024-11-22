import AppPageContainer from "@/components/app-page-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    return (
        <AppPageContainer
            headerContent={
                <h1 className="text-2xl font-semibold text-primary">
                    JourneyBuilder
                </h1>
            }
        >
            <Card className="mx-auto max-w-2xl p-6">
                <div className="space-y-8">
                    <h2 className="text-2xl font-semibold text-primary">
                        Welcome to Journey Builder!
                    </h2>
                    <p className="text-lg text-gray-600 my-6">
                        Here, you can easily create customized journey plans for
                        various roles and organizations. Let&apos;s get started!
                    </p>
                    {user ? (
                        <Link href="/journey/build">
                            <Button className="w-full" size="lg">
                                Get Started
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/sign-in">
                            <Button className="w-full" size="lg">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </Card>
        </AppPageContainer>
    );
}
