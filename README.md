🎟️ Ticket Management System

A full-stack Ticket Management System built to handle issue tracking, team-based assignment, and role-based workflows.
The system supports Admin, Agent, and User roles with dynamic ticket routing and dashboard metrics.

🚀 Live Demo

Frontend (Vercel): [(https://ticket-management-system-frontend-five.vercel.app/)]

Backend (Render): [(https://ticket-management-system-server.onrender.com/)]

🧠 Project Overview

This system allows:

Users to create and track tickets

Admins to manage teams, categories, agents

Agents to resolve assigned tickets

Auto-assignment of tickets based on category-team mapping

Filtering, sorting, and dashboard analytics

The project demonstrates relational data modeling, role-based access control, and backend-driven workflow logic.

🏗️ Tech Stack
Frontend

React.js

Axios

React Router

Tailwind CSS

Backend

Node.js

Express.js

MongoDB (Atlas)

Mongoose

JWT Authentication

bcrypt

Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

🔐 Authentication & Roles

JWT-based authentication with role-based access:

Admin

Manage teams

Manage categories

Manage agents

Assign tickets

View all tickets

Agent

View assigned tickets

Update status

Add comments

Dashboard metrics

User

Create tickets

View own tickets

Close resolved tickets

🎯 Core Features
1️⃣ Ticket Workflow

Create ticket

Auto-assign team based on category

Assign agent

Status transitions (Open → In Progress → Resolved → Closed)

Comment system

Activity log

2️⃣ Team & Category System

Teams manage agents

Categories mapped to teams

Ticket auto-routing using category-team relationship

One-team-per-agent validation

3️⃣ Filtering & Sorting

Dynamic query composition supports:

Filter by status

Filter by priority

Search by text

View unassigned tickets

Sort by newest / oldest / priority

4️⃣ Dashboard Metrics

Total tickets

High priority tickets

Team-based metrics

Agent-specific ticket counts

🧩 System Design Highlights

Role-based permission checks

Dynamic query building (filter composition)

Mongoose population for relational data

Activity tracking inside tickets

Notification triggers on assignment & comments

Data migration script for schema evolution

🔄 Schema Refactor (ObjectId Migration)

Originally, Team-Category relationships were string-based.
The system was refactored to use:

assignedTeam: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "teams"
}


This improved:

Data consistency

Rename safety

Query reliability

Scalability

A one-time migration script was used to convert string references to ObjectIds.

🛠️ Setup Instructions
1️⃣ Clone the repository
git clone <repo-url>
cd project-folder

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
DBConnection=your_mongodb_uri
JWT_SECRET=your_secret_key

4️⃣ Run server
npm start

📦 Deployment Notes

Backend deployed on Render

Frontend deployed on Vercel

Auto-deploy enabled via GitHub integration

MongoDB Atlas used as production database

For schema changes, migration scripts must be run manually before redeployment.

🧠 Learning Outcomes

Through this project, I gained experience in:

Backend system architecture

Data modeling with MongoDB

Role-based authorization

Query optimization

Deployment pipelines

Database migration strategies

Production debugging

🔮 Future Improvements

SLA tracking system

Pagination & indexing optimization

Audit logs for reopen actions

WebSocket-based real-time notifications

Automated testing suite

CI/CD pipeline enhancement

📌 Project Status

✔ Completed (Internship Project)


👨‍💻 Author

Developed as part of internship training to build a scalable support ticket management system.
