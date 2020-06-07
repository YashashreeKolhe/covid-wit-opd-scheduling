The repository holds the code for OPD Scheduling System which will help to follow social distancing norms at hospitals. It is a participation for WiT Hackathon.

## Contents
1.	Short description
2.	Demo video
3.	The architecture
4.	Project roadmap
5.	Getting started
6.	Versioning
7.	Acknowledgement

## Short description

### What's the problem?
Considering, today's crisis of global pandemic, practising social-norms has become, very crucial. As a result, management of social distancing norms, is a dire need to limit, further spread of covid-19, especially, in hospitals.

### How can technology help?
In India, very few hospitals use technology to manage patients in an OPD. In the prevailing, manual system used by majority of hospitals, patients have to stand and wait in long queues to visit doctor. This itself violates the essential social norms that need to be practised to curb the further spread of the virus. Moreover, hospital administration lacks effective tools to avert any threat posed by the potential covid-19 suspects among the patients visiting the hospital.

### The idea
To develop a centralized system to integrate OPD management for a number of hospitals, allowing patients to make an online appointment with any doctor from any hospital enrolled with us. The patient retrieves slot timings, thus limiting the number of patients visiting at given point of time, thereby ensuring social norms. 

System makes use of well-designed algorithms to cater to emergency cases by automatically rescheduling and notifying patients in the affected slots. Thus, our system covers the easiest way for different hospitals to restrict the number of people entering the hospital at a given time. 

Besides, we provide a tool for hospital administration to identify and track the potential covid suspects visiting the hospital for the day so that they can be isolated from other visitors.

## Demo Video

## The architecture

1.Visitor can register himself and book an appointment at desired hospital through the Angular Web App.
2.Admin (allocated to hospital) can book an appointment onbehalf of walk-in patients based on vacanies. He can also declare               unavailability of doctors. All this is performed through the Angular Web App hosted on IBM Cloud Foundry. 
4.The Spring Web API fetches/dumps data into the db and exposes the data on endpoints. The logic of OPD scheduling and algorithm of       postponing the appointments also lie here. It is deployed on IBM Cloud Foundry.
5.The DB2 database residing on ibm cloud to store the hospital, appointment, visitor data.
6.Due to issues in connecting db2 to web api, we are currently doing in-memory storage.

## Long description

## Project roadmap

Day | Frontend | Middle Tier | Database
---- | --------| ----------- |----------
3rd  June | Create wireframes |  Develop scheduling algorithm| Database schema
4th  June | Basic skeleton development | Backend logic implementation |	Create DB2 service
5th  June	| Screens development | Backend logic	| DDL Creation
6th  June |	Screens development and testing	|	Web API implementation| DML creation
7th  June	| Integration and testing with Backend | Integration and testing with frontend | Queries creation

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Angular Project setup

##### Prerequisites
  
 * Node.js installation: v12.16.3  https://nodejs.org/en/download/

Clone the repository, open the terminal and navigate into the directory where you have cloned the repo.
Run the following commands,
```
npm install
npm run start
```
You will have the UI running on https://localhost:4200

### Java Spring setup

##### Prerequisites
  
 * Install maven  https://maven.apache.org/download.cgi
 * Verify maven installation
   ```
   mvn -v
   ```
Clone the repository.
 * Build project using the command
  ```
  mvn compile
  ```
  * Run package goal
  ```
  mvn package
  ```
  * Run obtained jar file
  
You will have the web api running on http://localhost:8080

## Live demo

You can find a running system to test at https://covid-wit-opd-scheduling-delivery-pipeline.eu-gb.mybluemix.net/

## Built with

* IBM DB2 warehouse - The database used
*	Java Spring Boot  - The compute platform for handling logic and web API
* Angular 9 - The web framework used 
* Maven - Dependency management     
* IBM Cloud Foundry - Build and deployment platform for Angular Web App and Spring Web api
