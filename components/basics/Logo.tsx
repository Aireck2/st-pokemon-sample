import Image from "next/image";

import { Text } from "@nextui-org/react";

const Logo = () => {
  return (
    <>
      <Image src="/img/logo.png" alt="me" width="64" height="64" />
      <Text h2 color="white" hideIn={"xs"} css={{ margin: 0 }}>
        P
      </Text>
      <Text h3 color="white" hideIn={"xs"} css={{ margin: 0 }}>
        okemon
      </Text>
    </>
  );
};
export default Logo;
