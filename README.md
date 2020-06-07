Online Hospital OPD scheduling system during covid-19 outbreak which will make sure that the social distancing norms are not violated.

A basic GitHub repository example for Call for Code submissions and those projects that join the Code and Response initiative. Not all sections or files are required. You can make this as simple or as in-depth as you need.
Read this in other languages: English, 한국어, português.
Contents
1.	Short description
2.	Demo video
3.	The architecture
4.	Project roadmap
5.	Getting started
6.	Versioning
7.	Acknowledgement
Short description
What's the problem?
Considering today’s crisis of Global Pandemic, practicing social norms has become very crucial. As a result management of social distancing norms is a dire need to limit further spread of COVID-19 especially in the Hospitals.

How can technology help?
Technology can play a vital role in managing the crowd of patients visiting the Hospital. With the help of technology half the formalities required to be done at hospital can be done virtually, making the visit of a person to the Hospital be solely to meet Doctor.
The idea
To develop a Web Application which helps the patient book a time and doctor based on the availability from the listed hospitals. This application also gives the hospital management staff to manage the availability of the doctors and appointment slots of their respective hospitals.
The architecture











1.	User/Patient can register himself and book an appointment.
2.	Schedule appointment logic will look for whether selected slot is free or not and book an appointment accordingly.
3.	Admin can register for walk in patients. He can pull down scheduled appointments for further slot according to capacity of hospital to maintain social distancing measure.
4.	Admin can also pull down the appointment in case of emergency.
5.	If admin pulls down an appointment, user will be notified about the new timings accordingly.

Long description

Project roadmap

Day	Frontend	Middle Tier	Database
3rd  June	Create architecture, wireframes and database schema
4th  June	Create GIT repo and deploy it on IBM cloud	Create DB2 service
5th  June	Implement wireframes	Functions needed to get information from frontend	Created Tables
6th  June	Implement wireframes	Implement pull down, schedule appointment and notify user logic	Dumped data into table, created required DML statements and stored procedures
7th  June	Final integration of all three tiers and testing

Getting started
Installing
Angular Project setup:
1) Node.js installation: v12.16.3
2) clone the repository
3) Open terminal and navigate into the directory where you have cloned the repo
4) Run the following commands:
             npm install
             npm run start
      To build the project:
             npm run build

Live demo
Built with
•	IBM DB2 warehouse - The database used
•	IBM Cloud Functions - The compute platform for handing logic
•	IBM API Connect - The web framework used
•	Maven - Dependency management

