import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col bg-[#14151F] text-[#EDEDF4] antialiased">{children}</body>
    </html>
  );
}