from dotenv import load_dotenv
from helpers import get_erc20_contract, get_web3_object, load_private_key, get_contract_address

load_dotenv()  # take environment variables from .env.

w3 = get_web3_object()
ERC20 = get_erc20_contract()
PRIVATE_KEY = load_private_key()
TO_ADDRESS = "0x13753419760c69c71f96C7732b2E1d24141c3Ab2"

account = w3.eth.account.privateKeyToAccount(PRIVATE_KEY)


def print_account_info():
    print("[INFO] account address ", account.address)


def print_name_and_total_supply():
    print("[INFO] Token name: ", ERC20.functions.name().call())
    print("[INFO] Total Supply: ", ERC20.functions.totalSupply().call())


def transfer(amount):
    print(f"[INFO] Transfer {amount} wei to {TO_ADDRESS}")
    nonce = w3.eth.get_transaction_count(account.address)
    print("[INFO] nonce: ", nonce)
    send = ERC20.functions.transfer(TO_ADDRESS, amount)
    tx = send.buildTransaction({
        'from': account.address,
        'nonce': nonce
    })
    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print("[INFO] receipt ", receipt)

    events = ERC20.events.Transfer().processReceipt(receipt)
    print("[INFO] Events ", events)


def run():
    print_account_info()
    print_name_and_total_supply()
    transfer(10)


if __name__ == "__main__":
    run()
