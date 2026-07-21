# Confidential Contracts Template

A starter [Hardhat](https://hardhat.org/) project for building confidential tokens with
[OpenZeppelin Confidential Contracts](https://github.com/OpenZeppelin/openzeppelin-confidential-contracts)
and [Zama's FHEVM](https://docs.zama.ai/fhevm). It ships with an example ERC-7984 confidential
fungible token (`MyToken`) and a test suite you can build on.

> Click **"Use this template"** on GitHub to create your own repository from this template.

## What's inside

- [`contracts/MyToken.sol`](contracts/MyToken.sol) — an `ERC7984` confidential token with owner-gated `mint`/`burn`.
- [`test/MyToken.js`](test/MyToken.js) — example tests using the FHEVM mock: encrypting inputs, decrypting balances, and confidential transfers.
- Linting (Prettier + solhint + ESLint), a pre-commit hook, and a CI workflow, all preconfigured.

## Requirements

- [Node.js](https://nodejs.org/) 20+ (CI runs on 24.x)

## Getting started

```shell
npm install
npm run test
```

## Available scripts

| Script | Description |
| --- | --- |
| `npm run compile` | Compile the contracts. |
| `npm run test` | Run the test suite against the FHEVM mock. |
| `npm run test:gas` | Run tests with the gas reporter enabled. |
| `npm run coverage` | Generate a Solidity coverage report. |
| `npm run lint` | Check formatting and lint Solidity + JS/TS. |
| `npm run lint:fix` | Auto-fix formatting and lint issues. |
| `npm run clean` | Remove build artifacts. |

## Customizing the token

`MyToken` extends `ERC7984` (the [ERC-7984](https://eips.ethereum.org/EIPS/eip-7984) confidential
fungible token standard) with `Ownable` access control:

```solidity
contract MyToken is ERC7984, Ownable, ZamaEthereumConfig {
    function mint(address to, uint64 amount) public onlyOwner {
        _mint(to, FHE.asEuint64(amount));
    }
}
```

Rename the contract, adjust the mint/burn authorization, or compose in other
[confidential-contracts extensions](https://docs.openzeppelin.com/confidential-contracts/api/token)
(freezable, restricted, votes, ERC-20 wrapper, etc.) to fit your use case. Update
`test/MyToken.js` to match.

## Learn more

- [OpenZeppelin Confidential Contracts](https://docs.openzeppelin.com/confidential-contracts)
- [FHEVM documentation](https://docs.zama.ai/fhevm)
- [Hardhat documentation](https://hardhat.org/docs)

## License

Released under the [MIT License](LICENSE).
