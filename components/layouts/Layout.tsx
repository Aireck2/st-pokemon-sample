import React, { FC } from "react";
import Head from "next/head";
import { Header } from "../ui";

import { capitalize } from "@/helpers/functions";

interface LayoutProps {
  title?: string;
}

const origin = typeof window === "undefined" ? null : window.location.origin;

export const Layout: FC<LayoutProps & { children: React.ReactNode }> = ({
  children,
  title,
}) => (
  <>
    <Head>
      <title>{`${capitalize(title)} | Pokemon` || "Pokemon App"}</title>
      <meta name="author" content="Erick Escriba" />
      <meta
        name="description"
        content={`Information about pokemon, ${title}`}
      />
      <meta name="keywords" content={`${title}, pokemon, pokedex`} />

      <meta property="og:title" content={title || "Pokemon list"} />
      <meta
        property="og:description"
        content={`Information about pokemon, ${title}`}
      />
      <meta property="og:image" content={`${origin}/img/banner-min.png`} />
    </Head>

    <Header />
    <main style={{ padding: 20 }}>{children}</main>
  </>
);
