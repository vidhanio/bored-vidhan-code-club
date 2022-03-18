# Bored Vidhan Code Club

a lame project made for fun, to become a 🚀⚡️ web3 developer 🚀⚡️

## project structure

managed by a yarn workspace. svelte client in [/client](/client/), hardhat contract stuff in [/hardhat](/hardhat/), nft generation in [/images](/images/).

## deployed contract

[contract on etherscan](https://rinkeby.etherscan.io/address/0x9183eA580fc45D74f065d3fc1036584bB86bf956#writeContract)

## how to use

```sh
git clone https://github.com/vidhanio/bored-vidhan-code-club
cd bored-vidhan-code-club
yarn install
```

```sh
# shell 0
cd bored-vidhan-code-club/hardhat
yarn hardhat node
```

```sh
# shell 1
cd bored-vidhan-code-club/hardhat
yarn hardhat run scripts/deploy-bvcc.ts --network localhost
# copy the outputted contract address or do something like
export CONTRACT_ADDRESS = 0xwhateverthatthingwasyoucopied
cd ../client
echo "CONTRACT_ADDRESS=\"$CONTRACT_ADDRESS\"" > .env
yarn dev
```
