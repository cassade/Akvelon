const { expect } = require('chai')
const { ethers } = require('hardhat');

describe("TestContract", async () => {

    let testToken;
    let addresses;

    beforeEach(async function () {
        testToken = await ethers.getContractFactory('TestContract')
            .then(factory => factory.deploy());
        addresses = await ethers.getSigners()
            .then(signers => {
                return signers.map(s => s.address);
            });
    });

    it("should get storage pointer", async () => {
        const [addr] = addresses;
        const value = ethers.BigNumber.from(123456);

        // set value
        await testToken.setValue(addr, value);

        // get storage pointer
        const storagePointer = await testToken.getStoragePointer(addr);

        // get value directly from storage pointer
        const storagePointerValue = await ethers.provider.getStorageAt(testToken.address, storagePointer);

        expect(ethers.BigNumber.from(storagePointerValue)).eq(value);
    });
});