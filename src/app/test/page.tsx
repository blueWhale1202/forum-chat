"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

export default function TestPage() {
    const test = useCurrentUser();
    console.log("🚀 ~ TestPage ~ test:", test);

    return <div>ok</div>;
}
