import { resetPasswordAction } from "@/app/actions";
import AppPageContainer from "@/components/app-page-container";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;
    return (
        <AppPageContainer
            headerContent={
                <h1 className="text-2xl font-semibold text-primary">
                    Sign-Up to Journey
                </h1>
            }
        >
            <Card className="mx-auto max-w-2xl p-6">
                <form className="flex-1 flex flex-col min-w-64">
                    <h1 className="text-2xl font-medium">Reset password</h1>
                    <p className="text-sm text-foreground/60">
                        Please enter your new password below.
                    </p>
                    <Label htmlFor="password">New password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="New password"
                        required
                    />
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        required
                    />
                    <SubmitButton formAction={resetPasswordAction}>
                        Reset password
                    </SubmitButton>
                    <FormMessage message={searchParams} />
                </form>
            </Card>
        </AppPageContainer>
    );
}
