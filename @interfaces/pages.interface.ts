import { NextPage as NEXTPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPage<T> = NEXTPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
