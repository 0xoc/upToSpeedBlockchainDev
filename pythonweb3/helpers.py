import os
from erc20 import ERC20_ABI
from setting import networks
from web3 import Web3

def load_private_key() -> str:
    private_key = os.getenv("PRIVATE_KEY")
    if not private_key:
        raise Exception("[ERROR] Set PRIVATE_KEY env variable")
    return private_key

def get_contract_address() -> str:
    return networks['rinkeby']['erc20']


def get_web3_object():
    w3 = Web3(Web3.HTTPProvider(os.getenv('RINKEBY_URL')))
    if w3.isConnected():
        return w3
    else:
        raise Exception("Could not connect to provider ", os.getenv('RINKEBY_PROVIDER'))

def get_erc20_contract():
    return get_web3_object().eth.contract(
        address=get_contract_address(), 
        abi=ERC20_ABI)