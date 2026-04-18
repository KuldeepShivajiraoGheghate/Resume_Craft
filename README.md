# ResuméCraft — Dynamic Resume Builder

A full-stack MERN application to create, preview, and download professional resumes.

## Features
- Live resume preview (updates instantly as you type)
- 7 customizable sections: Profile, About, Education, Experience, Projects, Skills, Custom
- Download as PDF (A4, print-ready)
- Save resumes to MongoDB
- Saved resumes dashboard (load, delete, re-download)

## Tech Stack
- Frontend: React.js + Vite + TailwindCSS + Framer Motion
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- PDF: html2pdf.js

## Setup
1. Clone the repo
2. `cd server && npm install && npm run dev`
3. `cd client && npm install && npm run dev`
4. Add `MONGO_URI` to `server/.env`
5. Open http://localhost:5173
