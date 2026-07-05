# AI Persona Chat Website

## Project Overview

Build an AI-powered website that uses a large language model (LLM) to simulate conversations with either **Hitesh Choudhary** or **Piyush Garg**. The model should respond in a way that closely reflects each person's communication style, teaching approach, and personality.

The site is designed to learn from publicly available content such as YouTube videos, talks, blogs, and social media posts to recreate the tone and teaching style of both mentors.

## Features

- Chat with a simulated version of Hitesh Choudhary.
- Chat with a simulated version of Piyush Garg.
- Responses tailored to each persona's teaching style, tone, and personality.
- AI-driven conversation flow using an LLM backend.

## Installation

### Prerequisites

- Node.js 18 or newer
- npm or yarn
- An OpenAI API key (or equivalent API key for the LLM provider configured in the project)

### Steps

1. Clone the repository

```bash
git clone <repository-url>
cd "d:\Chai aur Gen AI\GenAI Assignments\01_persona"
```

2. Install dependencies

```bash
npm install
```

3. Copy the environment file and add your API key

```bash
cp .env.exemple .env
```

4. Start the backend server

```bash
npm run server
```

## Running the App

- Open your browser and visit `http://localhost:3000`.
- Choose either Hitesh Choudhary or Piyush Garg.
- Start chatting and experience persona-driven AI responses.

## Problem Statement

Build an AI-powered website that uses an LLM to simulate conversations with either **Hitesh Choudhary** or **Piyush Garg**. The model should respond in a way that closely reflects each person's communication style, teaching approach, and personality.

Use publicly available content such as YouTube videos, talks, blogs, and social media posts to study and recreate their tone.

## Notes

- Ensure your `.env` file is never committed to version control.
- Keep your API keys secure.
- Adjust environment variables as needed based on the actual implementation in the project.

## License

Specify the project license here.
