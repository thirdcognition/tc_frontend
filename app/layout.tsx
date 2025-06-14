import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono"; ${GeistMono.className}
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const defaultUrl = process.env.SERVER_URL
    ? `https://${process.env.SERVER_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "ThirdCognition Journey",
    description: "Start your learning journey with ThirdCognition"
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${GeistSans.className}`}
            suppressHydrationWarning
        >
            <body className="bg-background text-foreground">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset>{children}</SidebarInset>
                    </SidebarProvider>
                    {/* <main className="min-h-screen flex flex-col items-center">
                        <div className="flex-1 w-full flex flex-col gap-20 items-center">
                            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                                    <div className="flex gap-5 items-center font-semibold">
                                        <Link href={"/"}>
                                            ThirdCognition Journey
                                        </Link>
                                    </div>
                                    <HeaderAuth />
                                </div>
                            </nav>
                            <div className="flex flex-col gap-20 max-w-5xl p-5">
                                {children}
                            </div>

                            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                                <p>
                                    Powered by{" "}
                                    <a
                                        href="https://thirdcognition.com"
                                        target="_blank"
                                        className="font-bold hover:underline"
                                        rel="noreferrer"
                                    >
                                        ThirdCognition
                                    </a>
                                </p>
                                <ThemeSwitcher />
                            </footer>
                        </div>
                    </main> */}
                </ThemeProvider>
            </body>
        </html>
    );
}
