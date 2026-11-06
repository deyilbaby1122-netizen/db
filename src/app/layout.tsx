import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ashraf — Front-End Developer | Web Designer | Graphic Designer",
  description:
    "Ashraf is a creative frontend developer, web designer, and graphic designer building modern, interactive, responsive websites and digital experiences from Hyderabad, Sindh, Pakistan.",
  keywords: [
    "frontend developer",
    "web designer",
    "graphic designer",
    "Next.js",
    "React",
    "Three.js",
    "3D portfolio",
  ],
  authors: [{ name: "Ashraf", url: "https://github.com/deyilbaby1122-netizen" }],
  creator: "Ashraf",
  openGraph: {
    title: "Ashraf — Front-End Developer",
    description:
      "Creative frontend developer, web designer, and graphic designer building modern 3D interactive portfolio experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Ashraf — Front-End Developer",
    description:
      "Building modern, interactive, responsive websites and digital experiences.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
