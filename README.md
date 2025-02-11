# Hebrew Cursive Learning Bot

A Telegram bot that helps users learn how to write in Hebrew cursive through interactive exercises.  
Try the bot: [https://t.me/hebrew_cursive_bot](https://t.me/hebrew_cursive_bot)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Using PM2 for Process Management](#using-pm2-for-process-management)
- [Deployment on Render](#deployment-on-render)
- [Redis Session Handling](#redis-session-handling)
- [Error Handling & Debugging](#error-handling--debugging)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

## Features
- Step-by-step learning process
- Sentence generation based on user preferences
- Image generation for visual learning
- Customizable difficulty levels (1-5)
- AI-generated sentences and images
- Supports Redis session storage
- Deployed on Render
- Logs events to Axiom

## Tech Stack
- **Node.js** (Express.js for server)
- **Telegraf.js** (Telegram bot framework)
- **OpenAI API** (Sentence generation)
- **Redis** (Session management)
- **Render** (Hosting & deployment)
- **Axiom** (Logging)

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- Redis (local or cloud-based like Render)
- Telegram Bot Token (from @BotFather)

### Clone the Repository
```sh
git clone https://github.com/your-repo/telegram-hebrew-bot.git
cd telegram-hebrew-bot
```

### Install Dependencies
```sh
npm install
```

### Configure Environment Variables
Create a `.env` file in the root directory and add:
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
REDIS_URL=redis://127.0.0.1:6379
PORT=3000
AXIOM_API_TOKEN=your_axiom_api_token_here
AXIOM_DATASET=your_dataset_name_here
```
If using Redis on Render, replace `REDIS_URL` with the correct Render URL.

### Start the Bot Locally
```sh
node server.js
```

## Usage
- **/start:** Begin a new learning session.
- **/help:** Get assistance on how to use the bot.
- **Interactive Prompts:** Follow the prompts to set preferences like the number of sentences and difficulty level.

## Using PM2 for Process Management
To keep the bot running in the background:
```sh
npm install -g pm2
pm2 start server.js --name "telegram-bot"
pm2 save
pm2 startup
```

## Deployment on Render
1. Create a **Web Service** on Render.
2. Link the GitHub repository.
3. Set the environment variables in Render's dashboard.
4. Deploy the service.

For Redis:
- Add a **Redis instance** in Render.
- Use its connection URL in `REDIS_URL`.

## Redis Session Handling
The bot uses Redis for session management to store user progress. If Redis goes idle, the bot may stop responding. To prevent this:
- Implement a **keep-alive ping** (using `setInterval()` in `server.js`)
- Consider upgrading Redis for better uptime.

## Error Handling & Debugging
- Logs errors to Axiom.
- Handles unexpected bot crashes with Telegraf middleware.
- Can be restarted using `pm2 restart telegram-bot`.

## Future Improvements
- **Additional Learning Features:**  
  Expand interactive exercises and add progress tracking.
- **Multi-language Support:**  
  Extend the bot to support other languages and writing styles.
- **Enhanced UI/UX:**  
  Improve bot responses with inline keyboards and richer media.

## Contributing
1. Fork the repo.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.