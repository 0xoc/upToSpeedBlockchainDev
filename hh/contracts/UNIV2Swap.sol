// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

interface IUniswapV2Factory {
    function getPair(address token0, address token1)
        external
        view
        returns (address);
}

contract UNIV2Swapper {
    IUniswapV2Router02 private router;
    IUniswapV2Factory private factory =
        IUniswapV2Factory(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f);
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

    function swapExactInputSingle(uint256 amountIn) external {
        require(
            DAI.transferFrom(msg.sender, address(this), amountIn),
            "transferFrom failed."
        );
        require(DAI.approve(address(router), amountIn), "approve failed.");

        // amountOutMin must be retrieved from an oracle of some kind
        address[] memory path = new address[](2);
        path[0] = address(DAI);
        path[1] = address(WETH);

        router.swapExactTokensForTokens(
            amountIn,
            0, // bad consider proper silipage
            path,
            msg.sender,
            block.timestamp
        );
    }

    function getPair() public view returns (address) {
        return factory.getPair(address(DAI), address(WETH));
    }

    function lpBalance() public view returns (uint256) {
        IERC20 lp = IERC20(getPair());
        return lp.balanceOf(msg.sender);
    }

    function removeAllLiquidity() external {
        IERC20 lp = IERC20(getPair());
        uint256 liquidity = lp.balanceOf(msg.sender);

        require(
            lp.transferFrom(msg.sender, address(this), liquidity),
            "transferFrom failed."
        );

        lp.approve(address(router), liquidity);

        router.removeLiquidity(
            address(DAI),
            address(WETH),
            liquidity,
            0, // bad,
            0,
            msg.sender,
            block.timestamp
        );
    }

    function addLiquidity(uint256 amountDAI, uint256 amountWETH)
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        )
    {
        require(
            DAI.transferFrom(msg.sender, address(this), amountDAI),
            "DAI Transfer Failed"
        );
        require(
            WETH.transferFrom(msg.sender, address(this), amountWETH),
            "WETH Transfer Failed"
        );

        require(DAI.approve(address(router), amountDAI), "approve failed.");
        require(WETH.approve(address(router), amountWETH), "approve failed.");

        return
            router.addLiquidity(
                address(DAI),
                address(WETH),
                amountDAI,
                amountWETH,
                0, // bad, consider proper slipage
                0,
                address(msg.sender),
                block.timestamp
            );
    }
}
