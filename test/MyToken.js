const { FhevmType } = require('@fhevm/hardhat-plugin');
const { expect } = require('chai');
const { ethers, fhevm } = require('hardhat');

describe('MyToken', function () {
  beforeEach(async function () {
    const [owner, holder, recipient] = await ethers.getSigners();
    this.owner = owner;
    this.holder = holder;
    this.recipient = recipient;

    this.token = await ethers.deployContract('MyToken', ['MyToken', 'MTK', 'https://example.com/metadata']);
  });

  it('owner can mint a confidential balance', async function () {
    await this.token.connect(this.owner).mint(this.holder, 1000);

    // The balance is stored as an encrypted handle; the holder can decrypt it.
    const balanceHandle = await this.token.confidentialBalanceOf(this.holder);
    await expect(
      fhevm.userDecryptEuint(FhevmType.euint64, balanceHandle, this.token.target, this.holder),
    ).to.eventually.equal(1000);
  });

  it('holder can confidentially transfer tokens', async function () {
    await this.token.connect(this.owner).mint(this.holder, 1000);

    // Encrypt the transfer amount for the token, authorized by the sender.
    const encryptedInput = await fhevm
      .createEncryptedInput(this.token.target, this.holder.address)
      .add64(400)
      .encrypt();

    await this.token
      .connect(this.holder)
      ['confidentialTransfer(address,bytes32,bytes)'](
        this.recipient.address,
        encryptedInput.handles[0],
        encryptedInput.inputProof,
      );

    const recipientBalance = await this.token.confidentialBalanceOf(this.recipient);
    await expect(
      fhevm.userDecryptEuint(FhevmType.euint64, recipientBalance, this.token.target, this.recipient),
    ).to.eventually.equal(400);
  });
});
