import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviders } from "./providers/theme_provider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>
      </head>
      <body>
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
