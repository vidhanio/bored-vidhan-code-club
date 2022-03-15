// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.10;

contract Chatroom {
    struct User {
        address user;
        string name;
        address[] chats;
    }

    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    mapping(address => User) private _users;
    mapping(bytes32 => Message[]) private _chats;

    function _chatID(address user1, address user2)
        internal
        pure
        returns (bytes32)
    {
        if (user1 < user2) {
            return keccak256(abi.encodePacked(user1, user2));
        }

        return keccak256(abi.encodePacked(user2, user1));
    }

    function _getChat(address user1, address user2)
        internal
        view
        onlyValidPair(user1, user2)
        returns (Message[] memory)
    {
        return _chats[_chatID(user1, user2)];
    }

    function _areFriends(address user1, address user2)
        internal
        view
        onlyValidPair(user1, user2)
        returns (bool)
    {
        return _getChat(user1, user2).length != 0;
    }

    function isUser(address user) public view returns (bool) {
        return _users[user].user != address(0);
    }

    modifier onlyValidUser(address user) {
        require(isUser(user), "!isUser");
        _;
    }

    modifier onlyValidPair(address user1, address user2) {
        require(isUser(user1), "user1 !isUser");
        require(isUser(user2), "user2 !isUser");
        _;
    }

    modifier onlyFriends(address user1, address user2) {
        require(isUser(user1), "user1 !isUser");
        require(isUser(user2), "user2 !isUser");
        require(_areFriends(user1, user2), "!chatExists");
        _;
    }

    function getChat(address to)
        public
        view
        onlyValidPair(msg.sender, to)
        returns (Message[] memory)
    {
        return _chats[_chatID(msg.sender, to)];
    }

    function sendMessage(address to, string memory message)
        public
        onlyValidPair(msg.sender, to)
    {
        require(bytes(message).length != 0, "message.length == 0");

        _chats[_chatID(msg.sender, to)].push(
            Message(msg.sender, message, block.timestamp)
        );

        _users[msg.sender].chats.push(to);
    }
}
