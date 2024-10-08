import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Header from "@/components/header";
import SlideSession from "@/components/slide-session";
import { AppProvider } from "@/app/app-provider";
import accountApiRequest from "@/apiRequest/account";
import { AccountResType } from "@/schemaValidations/account.schema";
import { baseOpenGraph } from "@/app/share-metadata";

const inter = Inter({ subsets: ["latin"] });
type User = AccountResType["data"];

export const metadata: Metadata = {
  title: {
    template: "%s | NextJS",
    default: "NextJS",
  },
  description: "Generated by create next app",
  openGraph: baseOpenGraph,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get("sessionToken");
  let user: User | null = null;

  if (sessionToken) {
    const data = await accountApiRequest.getMyProfile(sessionToken.value);
    user = data.payload.data;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider initialSessionToken={sessionToken?.value} user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
