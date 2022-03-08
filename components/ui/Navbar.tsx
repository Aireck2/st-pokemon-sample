import Image from "next/image";
import { NextUIThemeContext, Spacer, Text, useTheme } from "@nextui-org/react";
import React, { CSSProperties } from "react";
import Link from "next/link";

const styles = (theme: NextUIThemeContext["theme"]): CSSProperties => {
  return {
    display: "flex",
    width: "100%",
    alignItems: "center",
    padding: "0px 20px",
    backgroundColor: theme?.colors.gray900 as any,
  };
};

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div style={styles(theme)}>
      <Link href={"/"}>
        <a>
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="icon app"
            width={70}
            height={70}
          />
        </a>
      </Link>
      <Text h2 color="white">
        P
      </Text>
      <Text h3 color="white">
        okemon
      </Text>
      <Spacer css={{ flex: 1 }}></Spacer>
      <Text color="white">Favoritos</Text>
    </div>
  );
};
