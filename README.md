How to Run This Project
Follow the steps below to set up and run the Real-Time Crypto Price Tracker :
Install Project Dependencies  :  npm install
This installs:
Core Packages:
react, react-dom
vite (for development server)
State Management:
@reduxjs/toolkit
react-redux
Styling:
tailwindcss
postcss
autoprefixer
run : npx tailwindcss init -p
Start the Development Server  :  npm run dev
Project Structure Overview
crypto-tracker/
├── src/
│   ├── app/                      # Redux store setup
│   ├── components/               # UI Components
│   ├── data/
│   │   └── sampleData.json       # Initial crypto data
│   ├── features/crypto/          # Redux logic & update simulator
│   ├── App.jsx                   # Main component
│   └── main.jsx                  # Entry point
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── package.json

