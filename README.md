# BookExplorer

## Project Structure
- /scraper → Scraping books from books.toscrape.com
- /backend → REST API using Node.js & Express
- /frontend → React + TypeScript frontend

## Setup

### 1. Install dependencies
```bash
# Scraper
cd scraper
npm install
npm start (optional)

# Backend
cd ../backend
npm install
npm start

# Frontend
cd ../frontend
npm install
npm run dev 

## Run Locally

1. Clone repo
```bash
git clone https://github.com/yourusername/bookexplorer.git
Create .env in /backend and /scraper:

MONGO_URI=your-mongodb-connection-string
PORT=5000

Start backend:
cd backend
npm install
npm start


Start scraper (optional):
cd ../scraper
npm install
npm start

Start frontend:
cd ../frontend
npm install
npm run dev
