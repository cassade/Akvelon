// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Task
// Add code to calculate storage address for value at address:

contract TestContract {
    mapping(address => uint256) values;

    function getStoragePointer(address _addr) public pure returns (bytes32 storagePointer) {
        uint256 slot = 0; // "values" field goes first in the contract
        return keccak256(abi.encode(_addr, slot));
    }

    function setValue(address _addr, uint256 value) public {
        values[_addr] = value;
    }
}