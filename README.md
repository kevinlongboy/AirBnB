# CraneBnB

_An AirBnB Clone_

Contents

- <a href="https://github.com/kevinlongboy/AirBnB/blob/main/README.md#-welcome-to-seattle" alt="Description of CraneBnB API">Description</a>
- <a href="https://github.com/kevinlongboy/AirBnB/blob/main/README.md#-api-overview" alt="Overview of CraneBnB API">Features</a>
- <a href="https://github.com/kevinlongboy/AirBnB/blob/main/README.md#-get-started" alt="Download CraneBnB API">Download</a>
- <a href="https://github.com/kevinlongboy/AirBnB/blob/main/README.md#-future-implementations" alt="Download CraneBnB API">Upcoming</a>
- <a href="https://github.com/kevinlongboy/AirBnB/blob/main/README.md#-languages-and-libraries-used" alt="Download CraneBnB API">Tech Stack</a>
- <a href="https://github.com/kevinlongboy/AirBnB/blob/main/README.md#-visit-the-site" alt="Download CraneBnB API">Demo</a>
- <a href="https://github.com/kevinlongboy/AirBnB/blob/main/README.md#-im-listening" alt="Download CraneBnB API">Connect</a>

---

## 🌊 Welcome to Seattle

... And welcome to CraneBnB, a virtual meeting place that connects visitors, and the like, to the finest _guest maisonettes_ in the Greater Seattle Area. Inspired by <a href="https://www.airbnb.com/" alt="AirBnB website">AirBnB</a>, CraneBnB allows its members the ability to host visitors in their own homes, or become guests in other members' spaces.

Don't miss this truly once in a lifetime opportunity to experience what Seattle has to offer. _Where else can you see an ocean wave, a fish fly, a mountain peak, and the world's largest needle?_
<br>
<br>
<img src="assets/gifs/frasier-niles-toast.gif" alt="Frasier and Niles Toasting GIF" width="250">

## 👀 API Overview

When navigating the site, users have the option to choose between the role of a Host, a Guest, or perhaps even both!

### Spots

_The main feature of CraneBnB_

As a Host, users are able to list their home on the site and highlight its best qualities in the listing. Hosts should give a brief description of their home, henceforth known as a "Spot", then choose a befitting rate for a nightly stay.

As a Guest, users are able to peruse through CraneBnB to find the perfect place for their stay in Seattle.
<br>
<br>
<img src="assets/gifs/fraiser-alistair-hilarious-chair.gif" alt="Frasier Alistair Hilarious Chair GIF" width="250">

### Reviews

_Hear the people's voice_

CraneBnB gives its members the ability voice their opinions and share their experiences from previous stays.

Users can also delete any reviews they've previously posted, if they so choose.
<br>
<br>
<img src="assets/gifs/roz-why-are-you-telling-her-this.gif" alt="Roz Why are You Telling Her This GIF" width="250">

## 🖱 Get Started

Ready to install CraneBnB? Follow the instructions below:

### 1. Navigate to GitHub:
* Click <a href="https://github.com/kevinlongboy/AirBnB" alt="CraneBnB GitHub repository link">here</a> to be redirected to the CraneBnB page
<img src="assets/instructions/setup-instructions-step-1.gif" alt="Navigate to GitHub GIF" width="400">

### 2. Download the API: 
* Click on the 'Code' button
* Select 'Download ZIP' from the dropdown menu
* Save the file in your desired location
<img src="assets/instructions/setup-instructions-step-2.gif" alt="Download the API GIF" width="400">

### 3. Open the repository:
* Navigate to the location where you previously saved your zipped file
* Unzip the file by double-clicking or by right-clicking on the file and selecting "Open"
* This unzipped folder is the repository which contains both the backend and frontend components of the API
<img src="assets/instructions/setup-instructions-step-3.gif" alt="Open the repository GIF" width="400">

### 4. Initialize the backend: 
* Open a new terminal
* Navigate to the _backend_ folder
* Download dependencies by running the command: "npm install"
* Initialize your database by running "npx dotenv sequelize db:migrate"
* Populate your database by running "npx dotenv sequelize db:seed:all"
* Start the backend server by running the command: "npm start"
<img src="assets/instructions/setup-instructions-step-4.gif" alt="Initialize the backend GIF" width="400">

### 5. Initialize the frontend: 
* Open a new terminal
* Navigate to the _frontend_ folder
* Download dependencies by running the command: "npm install"
<img src="assets/instructions/setup-instructions-step-5.gif" alt="Initialize the frontend GIF" width="400">

### 6. Launch the app:
* From the _frontend_ folder, run the command: "npm start"
* Allow React to open the app in your browswer
* Welcome to CraneBnB
<img src="assets/instructions/setup-instructions-step-6.gif" alt="Launch the app GIF" width="400">

---

## ⏳ Future Implementations

### Bookings

Bookings will supplement the Spots feature with functionality. Guests will be able to make, modify, and delete a reservation for a Spot, while Hosts will be able to view and manage any reservations for their own listings.
<br>
<br>
<img src="assets/gifs/martin-what-can-i-say.gif" alt="Martin Satisfied GIF" width="250">

### Images

Images feature will bring life to both Spots and Reviews. Hosts will have the ability to add, modify, and delete images for their Spot listings, and Guests will be able to do the same for any reviews they've written.
<br>
<br>
<img src="assets/gifs/daphne-victory.gif" alt="Daphne Victorious GIF" width="250">

## 📚 Languages and Libraries Used

### Framework:

<p>
<a href="https://www.javascript.com/"><img alt="JavaScript" width="45px" src="assets/tech-stack/javascript-logo.png"/></a> <a href="https://html.spec.whatwg.org/"><img alt="HTML" width="45px" src="assets/tech-stack/html-logo.png"/></a> <a href="https://www.w3.org/TR/CSS/#css"><img alt="CSS" width="45px" src="assets/tech-stack/css-logo.png"/></a> <a href="https://nodejs.org/en/"><img alt="Node.JS" width="45px" src="assets/tech-stack/nodejs-logo.svg"/></a>
<br>

### Backend:

<p>
<a href="https://sqlite.org/index.html"><img alt="SQLite" width="45px" src="assets/tech-stack/sqlite-logo.svg"/></a> <a href="https://sequelize.org/"><img alt="Sequelize" width="45px" src="assets/tech-stack/sequelize-logo.png"/></a> <a href="https://expressjs.com/"><img alt="Express" width="45px" src="assets/tech-stack/express-logo.png"/></a> <a href="https://www.postgresql.org/"><img alt="PostgreSQL" width="45px" src="assets/tech-stack/postgresql-logo.png"/></a>
<br>

### Frontend:

<p>
<a href="https://reactjs.org/"><img alt="React" width="45px" src="assets/tech-stack/react-logo.png"/></a> <a href="https://redux.js.org/"><img alt="Redux" width="45px" src="assets/tech-stack/redux-logo.png"/></a>
<br>

## 🧑‍💻 Visit the Site

Check out CraneBnB for yourself. Click the icon below to be redirected to Heroku, the current hosting site for the fullstack API:

<p>
<a href="https://kl-airbnb.herokuapp.com/"><img vertical-align="middle" alt="CraneBnB Live Site hosted via Heroku" width="45px" src="assets/social-media-branding/heroku-logo.jpg"/></a>

## 💙 I'm Listening...

<a href="https://github.com/kevinlongboy"><img vertical-align="middle" alt="Developer's GitHub Page" width="45px" src="assets/social-media-branding/github-logo.png"/></a> <a href="https://www.linkedin.com/in/kevinlongboy/"><img vertical-align="middle" alt="Developer's LinkedIn Page" width="45px" src="assets/social-media-branding/linkedin-logo.png"/></a>
<br>
<br>
<img src="assets/gifs/frasier-im-listening.gif" alt="Frasier I'm Listening GIF" width="325">
