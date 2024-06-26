import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SideNav from "@/components/SideNav";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gamerzone",
  description: "to be done later",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticated : Boolean= true;
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {authenticated && 
        <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
          <div className="w-auto flex-none md:border-r">
              <SideNav/>
          </div>
          <div className="flex-grow flex-1 w-full md:overflow-y-auto sm:p-6">
            {children}
          </div>
      
        </div>}

        {!authenticated && <div>Not Authenticated</div>}
        </ThemeProvider>
      </body>
    </html>
  );
}
