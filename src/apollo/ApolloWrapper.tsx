"use client";

import { ReactNode } from "react";
import { useApollo } from "./client";
import { ApolloProvider } from "@apollo/client";

interface Props {
  children: ReactNode;
  initialState?: any;
}

export default function ApolloWrapper({ children, initialState }: Props) {
  const client = useApollo(initialState);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
