import requests
from os import getenv

def ping_endpoint():
    url = getenv('ENDPOINT_URL') + '/test'
    response = requests.get(url)
    print(f"Status Code: {response.status_code}, Response: {response.text}")

if __name__ == "__main__":
    ping_endpoint()