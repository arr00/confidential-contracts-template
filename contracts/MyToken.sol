// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {FHE} from "@fhevm/solidity/lib/FHE.sol";
import {ERC7984} from "@openzeppelin/confidential-contracts/token/ERC7984/ERC7984.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC7984, Ownable, ZamaEthereumConfig {
    constructor(
        string memory name_,
        string memory symbol_,
        string memory tokenURI_
    ) ERC7984(name_, symbol_, tokenURI_) Ownable(msg.sender) {}

    function mint(address to, uint64 amount) public onlyOwner {
        _mint(to, FHE.asEuint64(amount));
    }

    function burn(address from, uint64 amount) public onlyOwner {
        _burn(from, FHE.asEuint64(amount));
    }
}
