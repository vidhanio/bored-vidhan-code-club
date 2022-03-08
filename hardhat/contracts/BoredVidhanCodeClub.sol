// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BoredVidhanCodeClub is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    mapping(string => bool) public existingURIs;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("BoredVidhanCodeClub", "BVCC") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri];
    }

    function payToMint(address recipient, string memory metadataURI)
        public
        payable
        returns (uint256)
    {
        require(!existingURIs[metadataURI], "URI already exists");
        require(msg.value >= 0.05 ether, "Minimum payment is 0.05 ether");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = true;

        _mint(recipient, tokenId);
        _setTokenURI(tokenId, metadataURI);

        return tokenId;
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
