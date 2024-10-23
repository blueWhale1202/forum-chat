"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "@/components/sidebar";
import { Toolbar } from "@/components/toolbar";

import { WorkspaceSidebar } from "@/features/workspaces/components/workspace-sidebar";

type Props = {
    children: React.ReactNode;
};

export default function WorkspaceLayout({ children }: Props) {
    const showPanel = false;

    return (
        <div className="h-full">
            <Toolbar />

            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar />

                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={20} minSize={20}>
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel
                        defaultSize={showPanel ? 50 : 80}
                        minSize={20}
                    >
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
}
