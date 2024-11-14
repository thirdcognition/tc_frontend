import { forgotPasswordAction } from "@/app/actions";
import AppPageContainer from "@/components/app-page-container";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;
    return (
        <AppPageContainer
            headerContent={
                <h1 className="text-2xl font-semibold text-primary">
                    Sign-In to Journey
                </h1>
            }
        >
            <Card className="mx-auto max-w-2xl p-6">
                <form className="flex-1 flex flex-col min-w-64">
                    <div>
                        <h1 className="text-2xl font-medium">Reset Password</h1>
                        <p className="text-sm text-secondary-foreground">
                            Already have an account?{" "}
                            <Link
                                className="text-primary underline"
                                href="/sign-in"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            placeholder="you@example.com"
                            required
                        />
                        <SubmitButton formAction={forgotPasswordAction}>
                            Reset Password
                        </SubmitButton>
                        <FormMessage message={searchParams} />
                    </div>
                </form>
            </Card>
        </AppPageContainer>
    );
}
