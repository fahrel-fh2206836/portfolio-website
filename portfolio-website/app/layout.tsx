import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fahrel Azki | Portfolio",
  description: "Fahrel Azki Hidayat Portfolio showcasing his experience, projects, and skills",
  icons: {
    icon: "light-icon.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
