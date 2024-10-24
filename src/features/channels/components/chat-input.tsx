"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { EditorValues } from "@/types";
import Quill from "quill";
import { Doc } from "../../../../convex/_generated/dataModel";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

type CreateMessage = Pick<
    Doc<"messages">,
    "channelId" | "workspaceId" | "body" | "image"
>;

type Props = {
    placeholder: string;
};

export const ChatInput = ({ placeholder }: Props) => {
    const editorRef = useRef<Quill>(null);
    const [isPending, setIsPending] = useState(false);

    //  To reset state of editor
    const [editorKey, setEditorKey] = useState(0);

    const onSubmit = async ({ body, image }: EditorValues) => {
        console.log("🚀 ~ onSubmit ~ body, image:", body, image);
    };

    return (
        <div className="w-full px-5">
            <Editor
                key={editorKey}
                variant="create"
                placeholder={placeholder}
                onSubmit={onSubmit}
                disabled={isPending}
                innerRef={editorRef}
            />
        </div>
    );
};
