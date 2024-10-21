"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordValidator from "password-validator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Create a schema for password validation
const passwordSchema = new PasswordValidator();
passwordSchema
    .is()
    .min(8, "The password should have a minimum length of 8 characters")
    .is()
    .max(100, "The password should have a maximum length of 100 characters")
    .has()
    .uppercase(1, "The password should contain at least one uppercase letter")
    .has()
    .lowercase(1, "The password should contain at least one lowercase letter")
    .has()
    .digits(1, "The password should contain at least one digit")
    .has()
    .symbols(1, "The password should contain at least one special character")
    .has()
    .not()
    .spaces(1, "The password should not contain spaces");

// Zod schema
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .refine((password) => passwordSchema.validate(password) === true, {
            message: "Password doesn't meet requirements",
        }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setSubmitError(null);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Form submitted:", data);
            // Handle successful login here
        } catch (error) {
            setSubmitError("An error occurred during login. Please try again.");
        }
    };

    const validatePassword = (password: string) => {
        const validationErrors = passwordSchema.validate(password, {
            details: true,
        }) as { message: string }[];

        setPasswordErrors(validationErrors.map((error) => error.message));
    };

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">
                    Login
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                validatePassword(
                                                    e.target.value,
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {passwordErrors.length > 0 && (
                                        <ul className="mt-2 list-inside list-disc text-sm text-red-500">
                                            {passwordErrors.map(
                                                (error, index) => (
                                                    <li key={index}>{error}</li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Log In
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                {submitError && (
                    <Alert variant="destructive">
                        <AlertDescription>{submitError}</AlertDescription>
                    </Alert>
                )}
            </CardFooter>
        </Card>
    );
}
