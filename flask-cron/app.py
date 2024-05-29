from flask import Flask
import requests
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)

# Defining function to ping the API
def ping_api(url):
  try:
    response = requests.get(url)
    print(f"Status Code for {url}: {response.status_code}")
  except Exception as e:
    print (f"Error: {e}")
    
# This is the scheduler
def scheduled_job():
  urls = [
        "https://my-to-do-app-staging.up.railway.app/test",
        "https://my-to-do-app-staging.up.railway.app/email_checkin",
        "https://my-to-do-app-staging.up.railway.app/email_reminder"
  ]
  for url in urls:
    ping_api(url)
    
scheduler = BackgroundScheduler()
scheduler.add_job(scheduled_job, 'interval', minutes=15)
scheduler.start()

@app.route('/')
def home():
  return "Flask Cron Job is running!"
  
if __name__ == '__main__':
  app.run()