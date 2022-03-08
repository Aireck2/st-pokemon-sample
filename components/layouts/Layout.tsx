import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface LayoutProps {
  title?: string;
}
export const Layout: FC<LayoutProps> = ({ children, title }) => (
  <>
    <Head>
      <title>{title || "Pokemon App"}</title>
      <meta name="author" content="Erick Escriba" />
      <meta
        name="description"
        content={`Information about pokemon, ${title}`}
      />
      <meta name="keywords" content={`${title}, pokemon, pokedex`} />
    </Head>

    <Navbar />
    <main style={{ padding: 20 }}>{children}</main>
  </>
);
