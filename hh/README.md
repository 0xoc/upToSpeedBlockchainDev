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

make sure the account corresponding to `<pk>` has some test WETH, DAI and ETH on the rinkeby chain so that the tests go through.

you can also manage token addresses and uniswap router addresses in `networks.config.ts` file

```typescript
const config = {
  rinkeby: {
    SwapRouterv2: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    SwapRouterv3: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    DAI: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
    WETH: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
  hardhat: {
    SwapRouterv2: undefined,
    SwapRouterv3: undefined,
    DAI: undefined,
    WETH: undefined,
  },
};
```

```shell
npx hardhat test --network rinkeby
```
