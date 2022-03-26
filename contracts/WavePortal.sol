// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    //state variables declaration
    uint256 totalWaves;
    uint256 private seed;

    //declaring events
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("A smart contract");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    //Actual wave function
    function wave(string memory _message) public {
        //Check if this person have no t waved in the last 15 minutes
        require(
            lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
            "Must wait 30 seconds before waving again."
        );

        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves += 1;
        //msg.sender help get the address of the person who called the contract
        console.log("%s has waved", msg.sender, _message);

        //append the message and the address of the user
        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.timestamp + block.difficulty + seed) % 100;

        console.log("Random # generated: %d", seed);

        if (seed <= 50) {
            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has"
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    //get  all waves
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    //Get total waves
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }
}
