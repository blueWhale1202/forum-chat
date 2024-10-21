"use client";

import { useState } from "react";
import { AuthFlow } from "../types";

import { passwordSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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
import { Separator } from "@/components/ui/separator";

import { Icons } from "@/components/icons";
import { ErrorsMessage } from "./errors-message";
import { TogglePasswordButton } from "./toggle-password-button";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .refine((password) => passwordSchema.validate(password), {
            message: "Password doesn't meet requirements",
        }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    onChangeFlow: (flow: AuthFlow) => void;
};

export const SignInCard = ({ onChangeFlow }: Props) => {
    const [showedPassword, setShowedPassword] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: FormValues) => {
        console.log("🚀 ~ onSubmit ~ values:", values);
    };

    const validatePassword = (password: string) => {
        const validationErrors = passwordSchema.validate(password, {
            details: true,
        }) as any[];

        const errorsMessage = validationErrors.map(
            (err) => err.message,
        ) as string[];
        setPasswordErrors(errorsMessage);
    };

    return (
        <Card className="w-full max-w-md p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Login to continue</CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2.5"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="name@work-email.com"
                                            type="email"
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

                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="******"
                                                type={
                                                    showedPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    validatePassword(
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                        </FormControl>

                                        <TogglePasswordButton
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            isShow={showedPassword}
                                            setIsShow={setShowedPassword}
                                        />
                                    </div>

                                    <FormMessage />
                                    <ErrorsMessage messages={passwordErrors} />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full">
                            Continue
                        </Button>
                    </form>
                </Form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        variant="outline"
                        size="lg"
                        className="relative w-full"
                        onClick={() => {}}
                    >
                        <Icons.google className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2" />
                        Continue with Google
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="relative w-full"
                        onClick={() => {}}
                    >
                        <Icons.gitHub className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2" />
                        Continue with Github
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <span
                        className="cursor-pointer text-sky-700 hover:underline"
                        onClick={() => onChangeFlow("signUp")}
                    >
                        Sign up
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};
