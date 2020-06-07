Submission name
License Slack Website

A basic GitHub repository example for Call for Code submissions and those projects that join the Code and Response initiative. Not all sections or files are required. You can make this as simple or as in-depth as you need.

Read this in other languages: English, 한국어, português.

Contents
Short description
Demo video
The architecture
Long description
Project roadmap
Getting started
Running the tests
Live demo
Built with
Contributing
Versioning
Authors
License
Acknowledgments
Short description
What's the problem?
Part of the World Health Organization's guidance on limiting further spread of COVID-19 is to practice social distancing. As a result, schools in most affected areas are taking precautionary measures by closing their facilities. With school-aged children at home for an indeterminate amount of time, keeping them engaged, entertained, and on top of their education is important.

How can technology help?
Schools and teachers can continue to engage with their students through virtual classrooms, and even create interactive spaces for classes. As parents face a new situation where they may need to homeschool their children, finding appropriate online resources is important as well.

The idea
It's imperative that learning and creating can continue when educational institutions have to shift the way they teach in times of crises, such as the COVID-19 pandemic. Providing a set of open source tools, backed by IBM Cloud and Watson Services, will enable educators to more easily make content available for their students.

Demo video
Watch the video

The architecture
Video transcription/translation app

The user navigates to the site and uploads a video file.
Watson Speech to Text processes the audio and extracts the text.
Watson Translation (optionally) can translate the text to the desired language.
The app stores the translated text as a document within Object Storage.
Long description
More detail is available here

Project roadmap
Roadmap

Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites
What things you need to install the software and how to install them

dnf install wget
wget http://www.example.com/install.sh
bash install.sh
Installing
A step by step series of examples that tell you how to get a development env running

Say what the step will be, for example

export TOKEN="fffd0923aa667c617a62f5A_fake_token754a2ad06cc9903543f1e85"
export EMAIL="jane@example.com"
dnf install npm
node samplefile.js
Server running at http://127.0.0.1:3000/
And repeat

curl localhost:3000
Thanks for looking at Code-and-Response!
End with an example of getting some data out of the system or using it for a little demo

Running the tests
Explain how to run the automated tests for this system

Break down into end to end tests
Explain what these tests test and why, if you were using something like mocha for instnance

npm install mocha --save-dev
vi test/test.js
./node_modules/mocha/bin/mocha
And coding style tests
Explain what these tests test and why, if you chose eslint for example

npm install eslint --save-dev
npx eslint --init
npx eslint sample-file.js
Live demo
You can find a running system to test at callforcode.mybluemix.net

Built with
IBM Cloudant - The NoSQL database used
IBM Cloud Functions - The compute platform for handing logic
IBM API Connect - The web framework used
Dropwizard - The web framework used
Maven - Dependency management
ROME - Used to generate RSS Feeds
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

Authors
Billie Thompson - Initial work - PurpleBooth
See also the list of contributors who participated in this project.

License
This project is licensed under the Apache 2 License - see the LICENSE file for details

Acknowledgments
Based on Billie Thompson's README template.
