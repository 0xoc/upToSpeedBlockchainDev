// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract UNIV2Swapper {
    IUniswapV2Router02 router;
    IERC20 public DAI;
    IERC20 public WETH;

    constructor(
        address _router,
        IERC20 _DAI,
        IERC20 _WETH
    ) {
        router = IUniswapV2Router02(_router);
        DAI = _DAI;
        WETH = _WETH;
    }

    function swapExactInputSingle(uint256 amountIn)
        external
        returns (uint256 amountOut)
    {
        require(
            DAI.transferFrom(msg.sender, address(this), amountIn),
            "transferFrom failed."
        );
        require(DAI.approve(address(router), amountIn), "approve failed.");

        // amountOutMin must be retrieved from an oracle of some kind
        address[] memory path = new address[](2);
        path[0] = address(DAI);
        path[1] = address(WETH);

        router.swapExactTokensForETH(
            amountIn,
            0,
            path,
            msg.sender,
            block.timestamp
        );
    }
}
