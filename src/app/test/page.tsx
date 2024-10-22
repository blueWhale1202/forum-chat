"use client";

import { SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Content } from "./_component/content";

export default function TestPage() {
    return (
        <div>
            <Unauthenticated>
                <h1>Login</h1>
                <SignInButton />
            </Unauthenticated>
            <Authenticated>
                <Content />
            </Authenticated>
        </div>
    );
}
