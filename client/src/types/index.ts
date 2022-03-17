import type { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}

export type Metadata = {
  name: string;
  image: string;
  attributes: Attribute[];
};

export type Attribute = {
  trait_type: string;
  value: string;
};
