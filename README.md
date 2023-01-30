#  Resident & Visitor Management System

Resident & Visitor Management System(RVMS) is my final year project in university which aims to develop a responsive web application to simplify the administrative work in management teams and create a cross-platform mobile application to facilitate communication. 
This repository consists of the source code of the mobile version of the system.

## Project introduction
Many problems arise in the neighbourhood due to improper communication. Management team must serve as middle man in order to coordinate problems that arise between residents. Effectively managing neighbourhoods is important to management teams to foster communication and enhance connections amongst neighbours and also avoid unnecessary arguments. So, it is particularly important for management to collect information of residents to help them to understand their needs. Moreover, In many guarded areas, the security guards still use paper-based methods to record each visitor when checking in. This costs a lot of time because the security guards manually record each person’s information, which often results in traffic congestion. Information like Resident information, visitors’ logs, and residents’ feedbacks and so forth which can help management to manage a residential area more effectively should be collected.

Therefore, this system is proposed. This project aims to **develop a responsive web application** to simplify the administrative work in management teams, **and create a cross-platform mobile application** to facilitate communication.

##  Modules description
### Web-based application
1. Registration Request and Approval Module
2. User Profile Module
3. Visitors’ Records Module
4. Announcements Broadcasting Module
5. Feedback Collection Module
### Mobile-based application
1. Registration Form Submission and Login
2. User Profile Module
3. Visitor’s Registration Module
4. Visitor’s Verification Module
5. Announcement Module
6. Residents’ Feedback Submission Module

## Target users
The targeted users for this project can be categorised into 4 groups which
include **neighbourhood management team** of a guarded neighbourhood,
**residents, visitors, and security guards**. Neighbourhood management team will
be the only user of the web application while residents, visitors, and security
guards are the users of the native mobile application in this project. This project
will focus 50 % on management teams, 30% on residents, 10% on visitors, and
10% on security guards.

## Development Phase
**Phased development methodology** was used to develop this project. This methodology includes four different phases: planning phase, analysis and design phase, development and testing phase, and closing phase. The project started off with the planning phase and analysis and design phase. Development and testing phase consists of **3 iterations**. The first iteration was setting up files and creating a connection to the database. The second iteration was implementing a web application while the last iteration was implementing a mobile application. 

The **web application** was created with **ReactJs, Next.js and Supabase** and the **mobile application** was created with **Expo and Supabase**. After the system was created, various tests were carried out to verify if the requirements are met.

## Screenshots


##  Tools, Technologies and Platform used
1. React
2. NextJS
3. Supabase
4. Expo
5. Git
6. Figma
7. Visual Studio Code

## Drawbacks
1. The web and mobile applications are *not able to instantly notify users of the latest updates through email, SMS or push notifications*. The updates can only be viewed by the users when they are using the web or mobile application. Therefore, this causes the users to have to constantly access the web and mobile applications to check for any new updates
notification.
2. The current version of the mobile application *only allows visitors to check in using visitation id and unit id* and generate a QR code for the visitors. However, memorising the visitation id and unit id could be tedious for visitors although the main purpose of this setup is to ensure the visitor is the person who is authorised by the residents. 
3. The current version of both application *only supports one reply for each feedback*. However, as commented by the user acceptance test tester, sometimes, one reply is not enough for one feedback as the management teams would need to update the follow-up action to the residents for the feedback.
4. The system was *only available in English.* However, the users of the system may come from different backgrounds and may only know specific languages such as Malay, Mandarin or Cantonese.
Therefore, the language used in this system may not be fully understood by the users and causing the users cannot fully utilise the system.

##  Improvement in the future for the present system
1. Live notification update
2. Record visitation's check out date and time
3. Scan IC to confirm the visitation
4. Implement AI Chatbot and realtime chat
5. More Language Support
6. Implement payment feature

> Written with [StackEdit](https://stackedit.io/).
