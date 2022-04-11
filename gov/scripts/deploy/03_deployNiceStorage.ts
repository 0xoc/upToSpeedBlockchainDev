import { ethers } from "hardhat";
import { NiceTimeLock } from "../../typechain";

export async function deployNiceStorage(owner: NiceTimeLock) {
  let factory = await ethers.getContractFactory("NiceStorage");
  let niceStorage = await factory.deploy();
  await niceStorage.deployed();

  console.log("Nice Storage deployed at ", niceStorage.address);
  console.log("Transfer ownership to NiceTimeLock");

  let tx = await niceStorage.transferOwnership(owner.address);
  await tx.wait(1);
  console.log("Ownership transferred");

  return niceStorage;
}
