# MERN Stack Portfolio Website

## Overview
This is a personal portfolio website built using the MERN (MongoDB, Express.js, React, Node.js) stack. It showcases projects, skills, and experience while providing dynamic content management. The project consists of three folders:
- **Client**: The frontend for the portfolio website.
- **Admin**: A separate React-based admin panel with JWT authentication.
- **Server**: The backend API handling authentication, database, and other operations.

## Features (Completed & In-Progress)
- ✅ About Me section
- ⏳ Projects showcase with dynamic content (upcoming)
- ⏳ Skills & Technologies section (upcoming)
- ⏳ Contact form with email integration (upcoming)
- ✅ Admin panel with JWT authentication
- ⏳ Content management via Admin panel (upcoming)

## Tech Stack
### Frontend:
- React.js (Client & Admin)
- Redux Toolkit 
- Tailwind CSS
- Shadcn & Magic UI

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication (for Admin panel login)

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB (local or cloud-based like MongoDB Atlas)
- Git

### Steps to Run the Project
#### 1. Clone the repository
```sh
git clone https://github.com/Avijit07x/Mern-Portfolio.git
cd your-portfolio
```

#### 2. Install dependencies
##### Backend
```sh
cd server
npm install
```
##### Client (Portfolio Frontend)
```sh
cd client
npm install
```
##### Admin Panel
```sh
cd admin
npm install
```

#### 3. Set up environment variables
Create a `.env` file in the `server` folder and add the following:
```
MONGO_URI = 

CLIENT_URL = 

PORT = 

TOKEN_KEY = 

TOKEN_KEY_EXPIRY = 

CLOUDINARY_CLOUD_NAME = 

CLOUDINARY_API_KEY = 

CLOUDINARY_API_SECRET = 

```

#### 4. Start the development server
##### Backend
```sh
cd server
npm run dev
```
##### Client (Portfolio Frontend)
```sh
cd client
npm start
```
##### Admin Panel
```sh
cd admin
npm start
```

#### 5. Open the application
Once all servers are running, open your browser and navigate to:
```
Client:  http://localhost:5173
Admin Panel:  http://localhost:5174
```

## Contribution
If you would like to contribute, feel free to fork the repository and create a pull request.

### Note:
The portfolio is continuously evolving, and new features will be added over time. Stay tuned! 🚀

