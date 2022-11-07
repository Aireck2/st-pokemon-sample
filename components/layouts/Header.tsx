import NextLink from "next/link";
import { Navbar, Link, Button } from "@nextui-org/react";
import Logo from "../basics/Logo";
import { FavoriteIcon } from "../basics";

const Header = () => {
  return (
    <Navbar shouldHideOnScroll variant="sticky">
      <Navbar.Brand>
        <NextLink href={"/"}>
          <Link>
            <Logo />
          </Link>
        </NextLink>
      </Navbar.Brand>
      <Navbar.Content>
        <NextLink href={"/favorites"} passHref>
          <Link>
            <Button auto color="error" icon={<FavoriteIcon fill="white" />}>
              Favoritos
            </Button>
          </Link>
        </NextLink>
      </Navbar.Content>
    </Navbar>
  );
};
export default Header;
