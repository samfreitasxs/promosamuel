import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Site de ofertas: sempre dinâmico (nada é pré-renderizado sem o banco).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "PromoSamuel — As melhores ofertas e promoções",
  description:
    "Encontre promoções em eletrônicos, suplementos, celulares, games, casa e mais. Links de afiliado rastreados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
