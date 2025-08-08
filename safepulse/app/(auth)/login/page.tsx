"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, Input, Button } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const success = await login(email, password);
            if (success) {
                router.push("/");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Sign in to SafePulse
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your credentials to access your account
                    </p>
                </div>

                <Card className="shadow-lg">
                    <CardHeader className="pb-0 pt-6 px-6">
                        <h3 className="text-lg font-semibold">Login</h3>
                    </CardHeader>
                    <CardBody className="px-6 pb-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isRequired
                                variant="bordered"
                                size="lg"
                            />

                            <Input
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isRequired
                                variant="bordered"
                                size="lg"
                            />

                            {error && (
                                <div className="text-red-500 text-sm">{error}</div>
                            )}

                            <Button
                                type="submit"
                                color="primary"
                                size="lg"
                                className="w-full"
                                isLoading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <a href="/signup" className="text-blue-600 hover:text-blue-500">
                                        Sign up
                                    </a>
                                </p>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
} 