"use client";

import { useCurrentWorkSpace } from "@/features/workspaces/hooks/use-current-workspace";

export default function WorkspacePage() {
    const { data } = useCurrentWorkSpace();

    return <div> Page: {JSON.stringify(data)}</div>;
}
