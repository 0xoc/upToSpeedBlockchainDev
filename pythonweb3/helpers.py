import os
def load_private_key() -> str:
    private_key = os.getenv("PRIVATE_KEY")
    if not private_key:
        raise Exception("[ERROR] Set PRIVATE_KEY env variable")
    return private_key

