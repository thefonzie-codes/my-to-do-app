# Done?

## What is Done?

**Done?** is at it's core, a to-do list.  I personally know how hard it can be to get started on tasks, and how much accountability can get you going.  The app's goal is to add a layer of accountability.  It will remind you of your tasks and check in to see if you've completed them, both at times you had specified.

![Dashboard](/frontend/docs/screenshots/dashboard_screenshot.png)

## Back End

Installation:

```bash
cd backend
touch .env # Create local environment file and define the dev environment
echo 'ENVIRONMENT=dev' >>.env
python3 -m venv env #Create a virtual environment to isolate package dependencies locally
source env/bin/activate
pip install -r requirements.txt
```

Run with:
```bash
source env/bin/activate
python3 manage.py runserver
```

## Front End

Installation:
```bash
cd frontend
npm install
```
Run with:
```bash
npm run dev
```

## The Building Journey - The Short Version

I wanted to learn Python and challenge myself by using a framework that had not been taught in my time at Lighthouse Labs(LHL), so I decided to build my back end with Django.  It was a challenge at first, having to learn the a new syntax and framework.  However, being able to find similarities between Django and Ruby on Rails(a framework learned at LHL) made a difference in being able to understand how the data flowed throughout the framework.

As I developed the application, I wanted to have some experience in deployment.  In our final project at LHL, we deployed our application on a cloud service called [Railway](https://railway.app/).  A teammate dealt with it back then, so I decided it was time to get my hands dirty.

I wanted to simplify the app deployment and ensure that it worked on multiple systems by Dockerizing it.  On my system, and even testing it on a separate PC, it worked great!  I deployed to railway and... the cron jobs didn't work.  It wasn't sending the reminder and check in emails as expected.  It took tons of troubleshooting and several hours of redeployment until I finally decided to create a separate service using flask to ping the back end for emails.

The front end wasn't too bad - until I decided to switch it to TypeScript.  My first conversion was a nightmare - figuring out how to avoid undefined or null types took a couple of days.  However, I learned that strict typing makes a big difference in avoiding bugs in the future.  It may be irritating to deal with now, but better than finding out you're having issues once it's deployed!  The actual deployment wasn't too bad.  Some use of GitHub pages and we were all set.

I would still prefer to find a more elegant solution specifically for the back end(I might even rebuild the back end with just flask, to get a lower level view) but it's a work in progress!  I'd also like to move from railway to AWS.  The goal is to get this up and running, and have some users test it.  It's not as pretty as I would like it to be, but the functionality is what I wanted so far.  