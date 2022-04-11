import os

from eth_typing import Address
from web3.contract import Contract

from erc20 import ERC20_ABI
from setting import networks
from web3 import Web3
from web3.middleware import geth_poa_middleware


def load_private_key() -> str:
    private_key = os.getenv("PRIVATE_KEY")
    if not private_key:
        raise Exception("[ERROR] Set PRIVATE_KEY env variable")
    return private_key


def get_contract_address() -> Address:
    return networks['rinkeby']['erc20']


def get_web3_object() -> Web3:
    w3 = Web3(Web3.HTTPProvider(os.getenv('RINKEBY_URL')))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    if w3.isConnected():
        return w3
    else:
        raise Exception("Could not connect to provider ", os.getenv('RINKEBY_PROVIDER'))


def get_erc20_contract() -> Contract:
    return get_web3_object().eth.contract(
        address=get_contract_address(),
        abi=ERC20_ABI)
