import { ethers } from "hardhat";
import { exit } from "process";
import { deployNiceToken } from "./00_deployNiceToken";
import { deployNiceTimeLock } from "./01_deployNiceTimeLock";
import { deployNiceGovernor } from "./02_deployNiceGovernor";
import { deployNiceStorage } from "./03_deployNiceStorage";

async function setupSystem() {
  let token = await deployNiceToken();
  let timeLock = await deployNiceTimeLock();
  let governor = await deployNiceGovernor(token, timeLock);
  let niceStorage = await deployNiceStorage(timeLock);
}

setupSystem()
  .then(() => exit(0))
  .catch((e) => console.log);
