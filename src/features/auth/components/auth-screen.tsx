"use client";

import { useState } from "react";
import { AuthFlow } from "../types";

import { ScrollArea } from "@/components/ui/scroll-area";

import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
    const [flow, setFlow] = useState<AuthFlow>("signIn");
    return (
        <div className="flex h-full items-center justify-center bg-indigo-500">
            {flow === "signIn" ? (
                <div className="md:h-auto md:w-[420px]">
                    <SignInCard onChangeFlow={setFlow} />
                </div>
            ) : (
                <ScrollArea className="rounded-md md:h-[96%] md:w-[420px]">
                    <SignUpCard onChangeFlow={setFlow} />
                </ScrollArea>
            )}
        </div>
    );
};
