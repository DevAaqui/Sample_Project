"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { HeroUIProvider } from "@heroui/react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <HeroUIProvider>
            <AuthProvider>{children}</AuthProvider>
        </HeroUIProvider>
    );
}
