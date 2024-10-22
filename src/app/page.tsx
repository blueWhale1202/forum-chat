import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Home() {
    return (
        <div>
            <ClerkLoaded>
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "size-10",
                            },
                        }}
                    />
                </SignedIn>
            </ClerkLoaded>
            <ClerkLoading>
                <Loader2 className="sze-10 animate-spin text-muted-foreground" />
            </ClerkLoading>
        </div>
    );
}
