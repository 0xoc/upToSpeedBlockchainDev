import { ethers } from "hardhat";
import { NiceTimeLock, NiceToken } from "../../typechain";
import { QUORUM_AMOUNT, VOTING_DELAY, VOTING_PERIOD } from "./config";

export async function deployNiceGovernor(
  token: NiceToken,
  timeLock: NiceTimeLock
) {
  let Factory = await ethers.getContractFactory("NiceGovernor");
  let niceGovernor = await Factory.deploy(
    token.address,
    timeLock.address,
    VOTING_DELAY,
    QUORUM_AMOUNT,
    VOTING_PERIOD
  );
  await niceGovernor.deployed();
  console.log("Nice Governor deployed at ", niceGovernor.address);
  return niceGovernor;
}
