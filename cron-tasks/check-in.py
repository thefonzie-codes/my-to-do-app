import requests

def ping_endpoint():
    url = 'https://my-to-do-app-production.up.railway.app/email_checkin/'
    response = requests.get(url)
    print(f"Status Code: {response.status_code}, Response: {response.text}")

if __name__ == "__main__":
    ping_endpoint()