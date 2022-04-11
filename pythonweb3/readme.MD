# Web3 python sample project

Use sample erc20 token on rinkeby to preform simple operations.

## Quick start

### account

edit `.env.sample` and provide a private key with some sample ERC20 token on rinkeby.
set `RINKEYBY_URL` wit a web3 HTTP provider address like Alchemy.
Rename the file to `.env`

### sample token contract

under `settings.py` edit `erc20` parameter for the `rinkeby` network and set it an erc20 contract address. Make sure the account you provided in the last step, has some tokens of this contract and some eth to pay gas.


### run
```shell
$ python main.py
[INFO] account address  0xaa6cD66cA508F22fe125e83342c7dc3dbE779250
[INFO] Token name:  Attention
[INFO] Total Supply:  1000000000000000000000
[INFO] Transfer 10 wei to 0x13753419760c69c71f96C7732b2E1d24141c3Ab2
[INFO] nonce:  394
[INFO] receipt  AttributeDict({'blockHash': HexBytes('0x78b9d00b56c2cf12585be2bc6ad8fe1f3d6d508092f3862352a4fbfb7600cb9a'), 'blockNumber': 10483888, 'contractAddress': None, 'cumulativeGasUsed': 3031777, 'effectiveGasPrice': 1418468220, 'from': '0xaa6cD66cA508F22fe125e83342c7dc3dbE779250', 'gasUsed': 35233, 'logs': [AttributeDict({'address': '0x93055D4D59CE4866424E1814b84986bFD44920b9', 'topics': [HexBytes('0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'), HexBytes('0x000000000000000000000000aa6cd66ca508f22fe125e83342c7dc3dbe779250'), HexBytes('0x00000000000000000000000013753419760c69c71f96c7732b2e1d24141c3ab2')], 'data': '0x000000000000000000000000000000000000000000000000000000000000000a', 'blockNumber': 10483888, 'transactionHash': HexBytes('0xffb68afd7a55d9e463029fd61cd7e56900e79b7b56bc788a50a1540fe3cbe5bd'), 'transactionIndex': 18, 'blockHash': HexBytes('0x78b9d00b56c2cf12585be2bc6ad8fe1f3d6d508092f3862352a4fbfb7600cb9a'), 'logIndex': 42, 'removed': False})], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000010000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000010000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000002002000000001000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': '0x93055D4D59CE4866424E1814b84986bFD44920b9', 'transactionHash': HexBytes('0xffb68afd7a55d9e463029fd61cd7e56900e79b7b56bc788a50a1540fe3cbe5bd'), 'transactionIndex': 18, 'type': '0x2'})
[INFO] Events  (AttributeDict({'args': AttributeDict({'from': '0xaa6cD66cA508F22fe125e83342c7dc3dbE779250', 'to': '0x13753419760c69c71f96C7732b2E1d24141c3Ab2', 'value': 10}), 'event': 'Transfer', 'logIndex': 32, 'transactionIndex': 30, 'transactionHash': HexBytes('0x4a7d25d9246b977caa07b25bdd544f9e0a968c77b0ca01600e73e560b056b707'), 'address': '0x93055D4D59CE4866424E1814b84986bFD44920b9', 'blockHash': HexBytes('0x0265444ec3b91bbc37b74d801ddff0f6e462ff51dcd9b601bcb9d115098d8743'), 'blockNumber': 10483901}),)
```