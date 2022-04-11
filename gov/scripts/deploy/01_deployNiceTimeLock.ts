import { ethers } from "hardhat";
import { MIN_DELAY } from "./config";

export async function deployNiceTimeLock() {
  let Factory = await ethers.getContractFactory("NiceTimeLock");
  let niceTimeLock = await Factory.deploy(MIN_DELAY, [], []);
  await niceTimeLock.deployed();
  console.log("Nice Time Lock deployed at ", niceTimeLock.address);
  return niceTimeLock;
}
