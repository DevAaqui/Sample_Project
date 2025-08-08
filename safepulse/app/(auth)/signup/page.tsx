"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, Input, Button } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: "/auth/register",
          payload: {
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-login after successful signup
        const loginSuccess = await login(formData.email, formData.password);
        if (loginSuccess) {
          router.push("/");
        } else {
          setError("Account created but login failed. Please try logging in.");
        }
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join SafePulse to get started
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-0 pt-6 px-6">
            <h3 className="text-lg font-semibold">Sign Up</h3>
          </CardHeader>
          <CardBody className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                label="Username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                isRequired
                variant="bordered"
                size="lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  isRequired
                  variant="bordered"
                  size="lg"
                />

                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  isRequired
                  variant="bordered"
                  size="lg"
                />
              </div>

              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                isRequired
                variant="bordered"
                size="lg"
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                isRequired
                variant="bordered"
                size="lg"
              />

              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                isRequired
                variant="bordered"
                size="lg"
              />

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <Button
                type="submit"
                color="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Sign in
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
