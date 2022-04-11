import { ethers, network } from "hardhat";
import { expect } from "chai";
import { IERC20, UNIV2Swapper, UNIV3Swapper } from "../typechain";
import settings from "../networks.config";

function getNetwork(): "rinkeby" | "hardhat" | undefined {
  switch (network.name) {
    case "rinkeby":
      return "rinkeby";
    case "hardhat":
      return "hardhat";
  }
}

const SwapRouter: string | undefined = settings[getNetwork()!]["SwapRouterv2"];
const DAI_ADDRESS: string | undefined = settings[getNetwork()!]["DAI"];
const WETH_ADDRESS: string | undefined = settings[getNetwork()!]["WETH"];

describe("Uniswap v2 test", async () => {
  let UNIV2SwapperContract: UNIV2Swapper;
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
    let UniManagerFactory = await ethers.getContractFactory("UNIV2Swapper");
    UNIV2SwapperContract = await UniManagerFactory.deploy(
      SwapRouter!,
      DAI.address,
      WETH.address
    );
    await UNIV2SwapperContract.deployed();
  });
  it("should have at least 10 dai", async () => {
    let [signer] = await ethers.getSigners();
    let balance = await DAI.balanceOf(signer.address);
    expect(balance.sub(ethers.utils.parseEther("10")).isNegative()).to.be.false;
  });
  it("should approve contract to spend dai", async () => {
    let [signer] = await ethers.getSigners();
    let tx = await DAI.approve(
      UNIV2SwapperContract.address,
      ethers.utils.parseEther("100")
    );
    await tx.wait(1);
    let allowance = await DAI.allowance(
      signer.address,
      UNIV2SwapperContract.address
    );
    expect(allowance.sub(ethers.utils.parseEther("100")).isNegative()).to.be
      .false;
  });
  it("Should swap 100 dai to weth", async () => {
    let out = await UNIV2SwapperContract.swapExactInputSingle(
      ethers.utils.parseEther("10")
    );
    await out.wait(1);
  });
});
