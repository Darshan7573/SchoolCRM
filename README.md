# SchoolCRM

SchoolCRM is a comprehensive school management system built using the MERN stack (MongoDB, Express.js, React, Node.js). This application is designed to streamline administrative tasks, manage student and teacher records, and provide insightful analytics. It features user roles for admins, teachers, and students.

## Features

- **Admin Dashboard**: Manage teachers, students, and view analytics.
- **Teacher Portal**: Display the student and allocated class and timings.
- **Student Portal**: Display the Teachers and allocated classes and timings.
- **Analytics**: Visualize key metrics and statistics for school performance.

## Live Deployment

You can access the live version of SchoolCRM at: [https://school-management-crm.netlify.app/]

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: FrontEnd [Netlify](https://www.netlify.com/), BackEnd [Render](https://render.com/)

## Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Clone the Repository

1. Open a terminal or command prompt.
2. Clone the repository to your local machine:

```bash
git clone https://github.com/Darshan7573/SchoolCRM
cd schoolcrm
```

### Navigate to the Backend Directory

```bash
cd backend

```

### Install Backend Dependencies

```bash
npm install

```

### Configure Environment Variables

```bash
Create a .env file in the backend directory with the following content:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Start the Backend Server

### Install Backend Dependencies

```bash
npm install

```

### Start the Express server

```bash
node server.js
```

# Contributing

We welcome contributions to enhance SchoolCRM. To contribute:

1.Fork the repository.
2.Create a feature branch (git checkout -b feature/YourFeature).
3.Commit your changes (git commit -am 'Add new feature').
4.Push to the branch (git push origin feature/YourFeature).
5.Open a Pull Request.
