import type { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface MetamaskEvents {
    accountsChanged: (accounts: string[]) => void;
    networkChanged: (network: string) => void;
  }

  interface Window {
    ethereum: ExternalProvider & {
      on<K extends keyof MetamaskEvents>(
        event: K,
        listener: MetamaskEvents[K]
      ): void;
      removeListener<K extends keyof MetamaskEvents>(
        event: K,
        listener: MetamaskEvents[K]
      ): void;
    };
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
