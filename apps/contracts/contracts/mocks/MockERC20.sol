// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockErc20 is ERC20("DAIMock", "DAIM"){
    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}
