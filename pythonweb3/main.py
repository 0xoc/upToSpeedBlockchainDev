from dotenv import load_dotenv
from helpers import load_private_key

load_dotenv()  # take environment variables from .env.

def run():
    private_key = load_private_key()
    print(private_key)


if __name__ == "__main__":
    run()
