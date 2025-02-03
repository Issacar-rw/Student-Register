ICP Blockchain Student Registration Management System

This project demonstrates how to use the Internet Computer Protocol (ICP) blockchain for managing student records. It provides a decentralized and secure way to register, retrieve, update, and delete student information on the blockchain.

Features
Register a student: Store student information such as name, age, ID, and course on the blockchain.
Retrieve student information: Fetch details of a specific student based on their ID.
Update student information: Modify existing student records, such as updating their course or personal information.
Delete student record: Remove a student's data from the blockchain.

Prerequisites
Before using this repository, ensure you have the following:

Dfinity SDK (DFX) installed: This is needed to interact with the Internet Computer blockchain.
Node.js (v16.x or higher) installed.
ICP Wallet: Required to manage funds for gas fees.
Git: For cloning the repository.
You can install the Dfinity SDK following the instructions from the official documentation: Dfinity SDK Installation

Setup Instructions
Clone the Repository

git clone https://github.com/Issacar-rw/register.git

cd st-registion

Install Dependencies

Run the following command to install required dependencies:

npm install
Deploy the Canister

Deploy your canister (smart contract) to the Internet Computer network. Make sure your local environment is set up and you're logged into the Dfinity network.

dfx deploy
Testing Locally

To run the app locally for development, start the local replica:

dfx start
Then, in another terminal, use the following command to interact with the deployed canister:

After testing locally, you can deploy your canister to the ICP mainnet by following the instructions in the Dfinity deployment guide.

Project Structure
{
  "canisters": {
    "st-registion-backend": {
      "main": "src/st-registion-backend/main.mo",
      "type": "motoko"
    },
    "st-registion-frontend": {
      "dependencies": [
        "st-registion-backend"
      ],
      "source": [
        "src/st-registion-frontend/dist"
      ],
      "type": "assets",
      "workspace": "st-registion-frontend"
    }
  },
  "defaults": {
    "build": {
      "args": "",
      "packtool": ""
    }
  },
  "output_env_file": ".env",
  "version": 1
}

This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
If you want to contribute to this project, feel free to fork it, create a branch, and submit a pull request. Issues, feature requests, and feedback are always welcome.

Contact
For questions or further inquiries, feel free to reach out via email or open an issue on GitHub.

