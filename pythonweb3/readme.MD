# Web3 python sample project

Use sample erc20 token on rinkeby to preform simple operations.

## Quick start

### account

edit `.env.sample` and provide a private key with some sample ERC20 token on rinkeby.
set `RINKEYBY_URL` wit a web3 HTTP provider address like Alchemy.
Rename the file to `.env`

### sample token contract

under `settings.py` edit `erc20` parameter for the `rinkeby` network and set it an erc20 contract address. Make sure the account you provided in the last step, has some tokens of this contract and some eth to pay gas.
