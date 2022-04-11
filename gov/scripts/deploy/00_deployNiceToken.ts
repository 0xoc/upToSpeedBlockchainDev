import { ethers } from "hardhat";
export async function deployNiceToken() {
  let tokenFactory = await ethers.getContractFactory("NiceToken");
  let token = await tokenFactory.deploy();

  console.log("Token deployed at ", token.address);

  return token;
}
