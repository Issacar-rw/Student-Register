Student Registration Management System

Overview
Web application for student registration using React and Internet Computer (DFINITY) blockchain technology.

Prerequisites
- Node.js
- dfx (Internet Computer SDK)
- npm

Setup Instructions

1.Clone repository

git clone https://github.com/Issacar-rw/Student-Register.git

Change into the project directory
cd Student-Registry

Install dependencies
npm install

Optional: Verify remote repository
git remote -v

2.Start local dfx replica
dfx start --clean --background

3.Deploy canisters
dfx deploy

4.Run development server
npm start

Environment Configuration
- Create `.env` file with:
VITE_CANISTER_ID_ST_REGISTION_BACKEND=your_canister_id
VITE_DFX_NETWORK=local

Key Technologies
- React
- Vite
- Internet Computer
- Motoko

Features
- Student registration form
- Blockchain-backed data storage
- Real-time validation
- Error handling
- Loading states

Deployment
- Local development: `npm run dev`
- Production build: `npm run build`

Troubleshooting
- Ensure dfx replica is running
- Check canister IDs
- Verify environment variables

Contact
uyissacar@gmail.com
