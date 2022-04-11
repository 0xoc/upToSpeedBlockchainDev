from dotenv import load_dotenv
from helpers import load_private_key, get_contract_address

load_dotenv()  # take environment variables from .env.

def run():
    private_key = load_private_key()
    erc20_address = get_contract_address()

    print(erc20_address)

if __name__ == "__main__":
    run()
