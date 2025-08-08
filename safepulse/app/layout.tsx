import "@/styles/globals.css";
import LayoutClient from "./LayoutClient";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: purple-dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full light">
      <head />
      <body className={`${inter.className} h-full `}>
        <Providers>
          <AuthProvider>
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto p-6">{children}</main>
                </div>
              </div>
            </ProtectedRoute>
          </AuthProvider>
        </Providers>{" "}
      </body>
    </html>
  );
}
