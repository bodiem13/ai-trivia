// Wrap all pages and components in AppProviders

import { AppProviders } from "./providers/AppProvider";

export const metadata = {
  title: "AI Trivia",
  description: "Trivia game powered by AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
