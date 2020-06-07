Online Hospital OPD scheduling system which will prove to be vital during the crisis of Global Pandemic of covid-19.

## Contents
1.	Short description
2.	Demo video
3.	The architecture
4.	Project roadmap
5.	Getting started
6.	Versioning
7.	Acknowledgement

## Short description

## What's the problem?
Considering, today's crisis of global pandemic, practising social-norms has become, very crucial. As a result, management of social distancing norms, is a dire need to limit, further spread of covid-19, especially, in hospitals.

## How can technology help?
In India, very few hospitals use technology to manage patients in an OPD. In the prevailing, manual system used by majority of hospitals, patients have to stand and wait in long queues to visit doctor. This itself violates the essential social norms that need to be practised to curb the further spread of the virus. Moreover, hospital administration lacks effective tools to avert any threat posed by the potential covid-19 suspects among the patients visiting the hospital.

## The idea
To develop a centralized system to integrate OPD management for a number of hospitals, allowing patients to make an online appointment with any doctor from any hospital enrolled with us. The patient retrieves slot timings, thus limiting the number of patients visiting at given point of time, thereby ensuring social norms. 

System makes use of well-designed algorithms to cater to emergency cases by automatically rescheduling and notifying patients in the affected slots. Thus, our system covers the easiest way for different hospitals to restrict the number of people entering the hospital at a given time. 

Besides, we provide a tool for hospital administration to identify and track the potential covid suspects visiting the hospital for the day so that they can be isolated from other visitors.

## The architecture











1.	Visitor can register himself and book an appointment at desired hospital through the Angular Web App.
2.	Admin (allocated to hospital) can book an appointment onbehalf of walk-in patients based on vacanies. He can also declare               unavailability of doctors. All this is performed through the Angular Web App hosted on IBM Cloud Foundry. 
4.  The Spring Web API fetches/dumps data into the db and exposes the data on endpoints. The logic of OPD scheduling and algorithm of       postponing the appointments also lie here. It is deployed on IBM Cloud Foundry.
5. The DB2 database residing on ibm cloud to store the hospital, appointment, visitor data.

## Long description

## Project roadmap

Day	Frontend	Middle Tier	Database
3rd  June	Create architecture, wireframes and database schema
4th  June	Create GIT repo and deploy it on IBM cloud	Create DB2 service
5th  June	Implement wireframes	Functions needed to get information from frontend	Created Tables
6th  June	Implement wireframes	Implement pull down, schedule appointment and notify user logic	Dumped data into table, created required DML statements and stored procedures
7th  June	Final integration of all three tiers and testing

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Angular Project setup

##### Prerequisites
  
  Node.js installation: v12.16.3

Clone the repository, open the terminal and navigate into the directory where you have cloned the repo.
Run the following commands,
```
npm install
npm run start
```
You will have the UI running on https://localhost:4200

## Live demo

You can find a running system to test at https://covid-wit-opd-scheduling-delivery-pipeline.eu-gb.mybluemix.net/

## Built with

* IBM DB2 warehouse - The database used
*	IBM Cloud Foundry - Build and deployment platform for Angular Web App and Spring Web api
* Maven - Dependency management
