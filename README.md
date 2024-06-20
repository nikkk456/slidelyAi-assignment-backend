# Slidely Form App Backend

This is the backend server for the Slidely Form App. It is built with Express and TypeScript and uses a JSON file as a database to store submissions.

## Project Structure


## Setup Instructions

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nikkk456/slidelyAi-assignment-backend
   cd slidelyAi-assignment-backend

2. **Install Dependencies**:
    npm install

3. **Start the server**:
    npm run start
    // The server will be started on localhost:3000 port and you can start using its services

## API endpoint

1. **Ping**
    - URL: '/ping'
    - Description: 'This endpoint is used to check if the server is running. It always returns true'
    - Method : 'GET'

2. **submit**
    - URL: '/submit'
    - Description: 'This endpoint is used to submit a new form entry.'
    - Method: 'POST'

3. **Read**
    - URL: 'read'
    - Description: 'This endpoint is used to read a form submission by its index.'
    - Method: 'GET'

## JSON Database Structure

{
  "submissions": [
    {
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "phone": "9876543210",
      "github_link": "https://github.com/john_doe/my_slidely_task",
      "stopwatch_time": "00:01:19"
    }
  ]
}
