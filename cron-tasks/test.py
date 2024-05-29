import requests
from dotenv import load_dotenv
load_dotenv()
import os

def ping_endpoint():
    url = os.getenv('ENDPOINT_URL') + '/test'
    response = requests.get(url)
    print(f"Status Code: {response.status_code}, Response: {response.text}")

if __name__ == "__main__":
    ping_endpoint()