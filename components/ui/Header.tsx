import Image from "next/image";
import { CSSProperties } from "react";
import NextLink from "next/link";

import {
  Link,
  NextUIThemeContext,
  Spacer,
  Text,
  useTheme,
} from "@nextui-org/react";

const styles = (theme: NextUIThemeContext["theme"]): CSSProperties => {
  return {
    display: "flex",
    width: "100%",
    alignItems: "center",
    padding: "0px 20px",
    backgroundColor: theme?.colors.gray900 as any,
  };
};

export const Header = () => {
  const { theme } = useTheme();

  return (
    <div style={styles(theme)}>
      <NextLink href={"/"} passHref>
        <Link css={{ display: "flex", alignItems: "center" }}>
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="icon app"
            width={70}
            height={70}
          />
          <Text h2 color="white">
            P
          </Text>
          <Text h3 color="white">
            okemon
          </Text>
        </Link>
      </NextLink>
      <Spacer css={{ flex: 1 }}></Spacer>
      <NextLink href={"/favorites"} passHref>
        <Link css={{ display: "flex", alignItems: "center" }}>
          <Text color="white">Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  );
};
