import "./globals.css";

export const metadata = {
  title: "Your Name | Web Developer",
  description:
    "A web developer building modern, user-friendly websites for businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
