declare module "ipfs-only-hash" {
  import type { UserImporterOptions } from "ipfs-unixfs-importer";

  export function of(
    content: string | Uint8Array,
    options?: UserImporterOptions
  ): Promise<string>;
}
