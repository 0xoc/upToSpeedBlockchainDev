// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NiceStorage is Ownable {
    uint256 public val;

    function store(uint256 _val) public onlyOwner {
        val = _val;
    }

    function retrieve() public view returns (uint256) {
        return val;
    }
}
