import { AppProviders } from "./providers";

export const metadata = {
  title: "AI Trivia",
  description: "Trivia game powered by AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap all children in providers */}
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
