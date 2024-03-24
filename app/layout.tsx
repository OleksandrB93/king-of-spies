import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderComponent from "@/components/header-comopnent";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import { TanstackProvider } from "@/components/providers/tanstack-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "King of Spies",
  description: "King of Spies the game for the party",
  // icons: {
  //   icon: "/favicon.ico",
  // },
  //todo: try add favicon
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "mx-8")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            <SessionProvider>
              <HeaderComponent />
              {children}
            </SessionProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
