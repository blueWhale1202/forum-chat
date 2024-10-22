import { Inter } from "next/font/google";
import "./globals.css";

import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";

import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ModalStoreProvider } from "@/providers/modal-store-provider";

const inter = Inter({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ConvexClientProvider>
                    <ModalStoreProvider>
                        {children}
                        <Modals />
                    </ModalStoreProvider>
                </ConvexClientProvider>
                <Toaster richColors theme="light" />
            </body>
        </html>
    );
}
