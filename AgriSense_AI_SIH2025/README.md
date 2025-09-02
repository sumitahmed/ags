AgriSense AI (SIH 2025)
This repository contains the source code for the AgriSense AI web application, a project for the Smart India Hackathon 2025.

Project Structure

AgriSense_AI_SIH2025/
├── index.html              # The main landing page
├── server.js               # Node.js Express server for routing
├── package.json
│
├── pages/                  # Application HTML pages
│   ├── dashboard.html
│   ├── fields.html
│   ├── insights.html
│   ├── login.html
│   ├── reports.html
│   └── settings.html
│
├── styles/                 # All page-specific CSS files
│
├── js/                     # All page-specific JavaScript files
│
└── images/                 # All static image assets
    ├── avatars/
    ├── backgrounds/
    ├── icons/
    └── reports/
How to Run
Follow these steps to get the application running on your local machine.

1. Install Dependencies
You'll need Node.js installed. Open your terminal in the project root and run:

Bash

npm install
This command installs the express framework, which is the only dependency.

2. Start the Server
Once the installation is complete, start the local server with:

Bash

npm start
You should see a message in the terminal confirming that the server is running:
🚀 Server running at http://localhost:3000

3. Open in Browser
Navigate to http://localhost:3000 in your web browser to use the application.
