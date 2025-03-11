# Vanish Vote Backend

An Express application built with TypeScript, integrating MongoDB via Mongoose to manage a Poll Management Platform. The API enables few operations of CRUD operations for poll and comments, while ensuring data integrity through Mongoose schema validation.

## Deployed live link

You can access the live version of the Bike Store API at:  
https://vanish-poll-backend.vercel.app

## Features

### Poll

1. Creating a Poll
   - Endpoint: `POST` `/api/v1/polls/create`
   - Adds a new poll
2. Getting all polls
   - Endpoint: `GET` `/api/v1/polls`
   - Retrieves all polls those are public and not expired yet
3. Getting a specific poll
   - Endpoint: `GET` `/api/v1/polls/:pollId`
   - Retrieves poll details by its ID.
4. Vote to a poll
   - Endpoint: `POST` `/api/v1/polls/vote`
   - Votes to specific poll
5. Add reaction
   - Endpoint: `POST` `/api/v1/polls/add-reaction`
   - Add reactions to the specific poll

### Comments

1. Add comment
   - Endpoint: `POST` `/api/v1/comments/add-comment`
   - Add comment to the specific poll
2. Getting all the comment
   - Endpoint: `POST` `/api/v1/comments/:pollId`
   - Retrieves all comments of specific poll

## Technologies

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Language**: TypeScript
- **Data Validation**: Zod

## Setup Instructions (For running the project locally)

### Prerequisites

- Node.js v16 or higher
- MongoDB (local or cloud instance)

### Steps

1. Clone the repository

```bash
git clone <repository-link>
cd bike-store-node-js
```

2. Install Dependencies

```bash
yarn install
```

3. Environment Variables

   Create an `.env` file and then add the environment variables.

```env
PORT = 3500
DATABASE_URL = "<your_database_url>"
```

4. Start the server

```bash
yarn dev
```

5. Access API

   API will be running at http://localhost:5500 or based on your `.env` file's configuration
