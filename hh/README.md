# Sample hardhat project

this projects makes use of Uniswap v2 and Uniswap v3, to perform test swaps and add test liquidity

## Quick start

```shell
npm install
```

create a `.env` file in the root directory and add the following:

```shell

RINKEBY_URL=https://eth-rinkeby.alchemyapi.io/v2/<key>
PRIVATE_KEY=<pk>
```

make sure the account corresponding to <pk> has some test WETH, DAI and ETH on the rinkeby chain so that the test go through.
