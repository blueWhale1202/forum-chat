"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { FormEvent, useState } from "react";
import { api } from "../../../../convex/_generated/api";

export const Content = () => {
    const messages = useQuery(api.messages.list) || [];
    const { user } = useUser();

    const [newMessageText, setNewMessageText] = useState("");
    const sendMessage = useMutation(api.messages.send);

    async function handleSendMessage(event: FormEvent) {
        event.preventDefault();
        await sendMessage({ body: newMessageText });
        setNewMessageText("");
    }
    return (
        <div>
            <span>
                Logged in{user!.fullName ? ` as ${user!.fullName}` : ""}
            </span>
            <div>
                <SignOutButton />
            </div>
            <ul>
                {messages.map((message) => (
                    <li key={message._id}>
                        <span>{message.author}:</span>
                        <span>{message.body}</span>
                        <span>
                            {new Date(
                                message._creationTime,
                            ).toLocaleTimeString()}
                        </span>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSendMessage}>
                <input
                    value={newMessageText}
                    onChange={(event) => setNewMessageText(event.target.value)}
                    placeholder="Write a message…"
                />
                <input
                    type="submit"
                    value="Send"
                    disabled={newMessageText === ""}
                />
            </form>
        </div>
    );
};
