import { ethers, network } from "hardhat";
import { expect } from "chai";
import { IERC20, UniManager } from "../typechain";
import settings from "../networks.config";

function getNetwork(): "rinkeby" | "hardhat" | undefined {
  switch (network.name) {
    case "rinkeby":
      return "rinkeby";
    case "hardhat":
      return "hardhat";
  }
}

const SwapRouter: string | undefined = settings[getNetwork()!]["SwapRouter"];
const DAI_ADDRESS: string | undefined = settings[getNetwork()!]["DAI"];
const WETH_ADDRESS: string | undefined = settings[getNetwork()!]["WETH"];

describe("Uniswap v3 test", async () => {
  let UniManagerContract: UniManager;
  let DAI: IERC20;
  let WETH: IERC20;

  async function loadTokens() {
    if (DAI_ADDRESS) {
      DAI = await ethers.getContractAt("IERC20", DAI_ADDRESS);
    } else {
      // deploy mock contract
    }

    if (WETH_ADDRESS) {
      WETH = await ethers.getContractAt("IERC20", WETH_ADDRESS);
    } else {
      // deploy mock contract
    }

    // todo: swap router check
  }

  before(async () => {
    await loadTokens();
    let UniManagerFactory = await ethers.getContractFactory("UniManager");
    UniManagerContract = await UniManagerFactory.deploy(
      SwapRouter!,
      DAI.address,
      WETH.address
    );
    await UniManagerContract.deployed();
  });
  it("should have at least 10 dai", async () => {
    let [signer] = await ethers.getSigners();
    let balance = await DAI.balanceOf(signer.address);
    expect(balance.sub(ethers.utils.parseEther("10")).isNegative()).to.be.false;
  });
  it("should approve contract to spend dai", async () => {
    let [signer] = await ethers.getSigners();
    let tx = await DAI.approve(
      UniManagerContract.address,
      ethers.utils.parseEther("100")
    );
    await tx.wait(1);
    let allowance = await DAI.allowance(
      signer.address,
      UniManagerContract.address
    );
    expect(allowance.sub(ethers.utils.parseEther("100")).isNegative()).to.be
      .false;
  });
  it("Should swap 100 dai to weth", async () => {
    let out = await UniManagerContract.swapExactInputSingle(
      ethers.utils.parseEther("10")
    );
    await out.wait(1);
  });
});
