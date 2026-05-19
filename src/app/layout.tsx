import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuizNova — Premium Interactive Quiz Platform",
  description:
    "Challenge yourself with beautifully crafted quizzes. A premium, smooth, and engaging quiz experience built for the modern web.",
  keywords: ["quiz", "interactive", "learning", "knowledge", "trivia"],
  authors: [{ name: "QuizNova" }],
  openGraph: {
    title: "QuizNova — Premium Interactive Quiz Platform",
    description: "Challenge yourself with beautifully crafted quizzes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
