<<<<<<< HEAD
# Online Judge (Ethical Land)
> #### An Online-judge system based on Node and React (MERN Stack). 
> #### <a href="https://Ethical Landoj.netlify.app/">Live</a> 
## Features
- [x] Authentication and Authorization
- [x] Submit your code
- [x] Test your code
- [x] Verdicts
    * Compilation Error (CE)  ![](https://s3.amazonaws.com/codechef_shared/misc/alert-icon.gif)
    * Runtime Error (RTE)  ![](https://www.codechef.com/misc/runtime-error.png)
    * Wrong Answer (WA)  ![](https://www.codechef.com/misc/cross-icon.gif)
    * Accepted (AC)  ![](https://www.codechef.com/misc/tick-icon.gif)
- [x] Add new problems
- [x] Update problems
- [x] Added Blogs section
- [x] See previous submissions
- [x] Dashboard
- [x] Sort problems based on different parameters
- [ ] Contest Rating
- [ ] Live LeaderBoard
- [ ] Email verification
- [ ] Collaborative code editor


## Working
A web application for online judge(algorithm questions), built with MERN stack( MongoDB, Express, React and Node.js ). This online judge application is used to practice programming to solve algorithm questions. It can compile and execute code, and test them with pre-constructed data. The output of the code will be captured by the system, and compared with the standard output. The system will then return the result.

## Supported Languages
* C
* C++ 11/14/17 (GCC)
* Python 3

## Prerequisite
+ Docker Desktop
+ Node.js

## Env Variables

> #### In frontend/.env:
```
REACT_APP_FIREBASE_API_KEY = <from firebase console>
REACT_APP_FIREBASE_AUTH_DOMAIN = <from firebase console>
REACT_APP_FIREBASE_PROJECT_ID = <from firebase console>
REACT_APP_FIREBASE_STORAGE_BUCKET = <from firebase console>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = <from firebase console>
REACT_APP_FIREBASE_APP_ID = <from firebase console>
GOOGLE_CLIENT_ID = <from firebase console>

```
> #### In backend/.env:
```
MONGO_URL = <your_mongodb_url>
SECRET_KEY = <your_secret_key>
PORT = 8000
SUBMISSION_PORT = 4000

```

## Setup Locally
### Make sure to install docker in your machine.

> #### Start Docker Desktop
```bash
git clone https://github.com/Ritik0824/OJ-Project.git
cd OJ-Project
```

### Frontend
```bash
cd frontend
npm install
npm start
```
### Server
```bash
cd backend
docker build -t <Image_Name> .
cd ..
npm start
```
### Make sure to start Docker Desktop before the command npm start.
🎉 And that's it! You will now be able to visit <a href="http://localhost:3000/">http://localhost:3000/</a> URL and see your application up and running.

### The following functions are under development.

+ Contest - Generate contest by randomly selecting four questions from the question library.
+ Collaborative code editor - Different users can work on the same solution simultaneously.

## Tech Stack
The Server is built with Express and MongoDB. The used libraries for server are listed as follows.

+ RESTful API: express, express router, mongoose, cors
+ Logging: firebase
+ User Authentication: jsonwebtoken, passport, cookie-parser, express-jwt
+ The Client is built with React and 3rd-party libraries



=======
# ethical_land
>>>>>>> 8d6b00f3c0c073f379fde0cd584f077ff0a14020
