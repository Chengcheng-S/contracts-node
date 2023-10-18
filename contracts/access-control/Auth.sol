// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Auth{
    address private _adminaddress;

    constructor(address deployer){
        _adminaddress = deployer;
    }

    function isAdministrator(address user)public view returns (bool){
        return user == _adminaddress;
    } 
}
