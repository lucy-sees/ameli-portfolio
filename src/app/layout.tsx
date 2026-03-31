import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { AgentProvider } from "@/context/AgentContext";
import CommandCenter from "@/components/agent/CommandCenter";
import CommandTrigger from "@/components/agent/CommandTrigger";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucy Sees | UI/UX Designer & Digital Curator",
  description:
    "Senior UI/UX Designer & Photographer. AI-powered portfolio — press ⌘K to navigate.",
  openGraph: {
    title: "Lucy Sees | UI/UX Designer",
    description: "AI-orchestrated portfolio. Type ⌘K to navigate.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="bg-void text-surface overflow-x-hidden">
        <AgentProvider>
          {children}
          <CommandCenter />
          <CommandTrigger />
        </AgentProvider>
      </body>
    </html>
  );
}
