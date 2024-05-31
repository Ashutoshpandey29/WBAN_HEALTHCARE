# WBAN_HEALTHCARE
Project titled "Security and Privacy Preserved Automatic Health Emergency Detection and MSP Selection in IoT Based Smart Healthcare System".

## INSTALLATION
Before using the software, please ensure that all the dependencies are installed. 

### DEPENDENCIES

    • Node.js- Node.js — Download Node.js® (nodejs.org)
    • MongoDB- Install MongoDB - MongoDB Manual v7.0

### COMPONENTS
The entire software majorly consists of two parts: 

    • The Web Application’s Frontend
    • The Backend Server

### STEPS

##### CLONE THE REPOSITORY

```
git clone https://github.com/Ashutoshpandey29/WBAN_HEALTHCARE.git
cd your-repo
```

##### INSTALL FRONT-END DEPENDENCIES

```
npm install
```

##### INSTALL BACK-END DEPENDENCIES

```
cd backend
npm install
```
##### START MONGODB

```
mongod
```

##### START THE FRONT-END SERVER

```
npm start
```

##### START THE BACK-END SERVER

```
cd backend
node app.js
```

## USAGE

### HOME PAGE
![image](https://github.com/Ashutoshpandey29/WBAN_HEALTHCARE/assets/121280475/cc2fede5-9050-4990-8367-e204f3cc2c64)
Serves as the cover page and allows navigation feature, where user can choose his role and move to authentication.
    1. User Interface: For Medical Users
    2. Hospital Interface: For Medical Service Provider

### USER AUTHENTICATION PAGE
![image](https://github.com/Ashutoshpandey29/WBAN_HEALTHCARE/assets/121280475/47e9342b-bde7-40a4-8fc4-16f8ea7db87c)
The user may enter his correct credentials to get access to the services of the WBAN application. For new user, Signing Up to the software is required before using the services. 

### USER DASHBOARD
![Screenshot from 2024-06-01 02-55-36](https://github.com/Ashutoshpandey29/WBAN_HEALTHCARE/assets/121280475/298fd977-b3bb-40f1-943f-3d7df75d8074)

The user can access two services, each of which uses algorithms elicited in the research paper.

### EMERGENCY DETECTION
![image](https://github.com/Ashutoshpandey29/WBAN_HEALTHCARE/assets/121280475/9772699f-a316-456b-a0ce-ab3125cd8a9b)

User can enter his test result values corresponding to the labeled fields and submit.
The emergency detection algorithm works by using the concept of MDRQ trees, and outputs whether the condition is critical or not, on the dashboard.

![image](https://github.com/Ashutoshpandey29/WBAN_HEALTHCARE/assets/121280475/c1b96068-ca42-4649-9ed4-cfcb06a535e0)

### MSP SELECTION

![image](https://github.com/Ashutoshpandey29/WBAN_HEALTHCARE/assets/121280475/42148551-0b74-4760-80e5-346dee590637)

If the user chooses the option to visit a doctor, he is required to enter his location in terms of axes coordinates (x, y, z), which goes to the MSP selection algorithm in the server, when the submit button is clicked.
The closes hospital’s address and contact number is Displayed to the user.
Also, on the MSP side, the request for treatment of this specific user is displayed.

### MSP AUTHENTICATION

While registering to the WBAN software, each MSP needs to enter its location coordinates.

### MSP DASHBOARD
![image](https://github.com/Ashutoshpandey29/WBAN_HEALTHCARE/assets/121280475/df152d47-fa8b-44d1-ae37-41da185a847f)
![image](https://github.com/Ashutoshpandey29/WBAN_HEALTHCARE/assets/121280475/6dad0b32-d043-4b1d-8165-3e39905735b0)

Once the MSP is successfully logged in, they can view the patients assigned to them, along with their coordinates.
These coordinated are sent by the users assigned to respective MSPs in the MSP selection phase.

## CONTRIBUTING

You can develop the algorithm for faster prediction of results.

## LICENCE

**Developers**: Ashutosh Pandey & Vasu Pandey    
**Guide**: Dr Subhasis Dhal     
**Researcher**: Anupam Pattanayak & Mou Dutta

## CONTACT
ASHUTOSH PANDEY : ashutosh.pandey29@gmail.com

