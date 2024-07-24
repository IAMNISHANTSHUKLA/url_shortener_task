import base62
import os
def generate_short_url():
    counter = int.from_bytes(os.urandom(6), byteorder="big")
    return base62.encode(counter)
