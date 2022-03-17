// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BoredVidhanCodeClub is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("BoredVidhanCodeClub", "BVCC") {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeiehoffon5le4lq6vh3lkmssegs2d2vcspxxvvtaxmogoh3jt5yciy/";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function mint() public payable {
        require(msg.value >= 0.05 ether, "ether !>= 0.05 ether");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId);
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
