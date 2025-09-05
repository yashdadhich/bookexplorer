// scraper/scraper.js
require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

const Book = require("./models/Book");

const BASE_URL = "https://books.toscrape.com/";

/**
 * Connect to MongoDB
 */
async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not provided in .env");

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(" Connected to MongoDB");
}

/**
 * Convert rating words like "One", "Two" → numeric values
 */
function ratingWordToNumber(word) {
  const map = { One: 1, Two: 2, Three: 3, Four: 4, Five: 5 };
  return map[word] || 0;
}

/**
 * Ensure we always return an absolute URL
 */
function absoluteUrl(relative, base) {
  try {
    return new URL(relative, base).href;
  } catch {
    return relative;
  }
}

/**
 * Scrape one page of books
 */
async function scrapePage(url) {
  console.log("Fetching:", url);

  const res = await axios.get(url, {
    headers: { "User-Agent": "BookExplorerScraper/1.0" },
  });

  const $ = cheerio.load(res.data);
  const books = [];

  $(".product_pod").each((_, el) => {
    const title = $(el).find("h3 a").attr("title")?.trim() || "";
    const relDetail = $(el).find("h3 a").attr("href");
    const detailUrl = absoluteUrl(relDetail, url);

    const priceText = $(el).find(".price_color").text().trim(); // e.g. "£51.77"
    const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;

    const availability = $(el).find(".availability").text().trim();

    const ratingClass = $(el).find(".star-rating").attr("class") || "";
    const ratingWord = ratingClass.replace("star-rating", "").trim();
    const rating = ratingWordToNumber(ratingWord);

    const thumbRel = $(el).find(".image_container img").attr("src");
    const thumbnail = absoluteUrl(thumbRel, url);

    books.push({ title, price, availability, rating, detailUrl, thumbnail });
  });

  const nextRel = $(".next a").attr("href");
  const nextUrl = nextRel ? absoluteUrl(nextRel, url) : null;

  return { books, nextUrl };
}

/**
 * Insert or update books in DB
 */
async function upsertBooks(bookList) {
  for (const b of bookList) {
    try {
      await Book.updateOne(
        { detailUrl: b.detailUrl }, // match on detailUrl
        { $set: b }, // update fields
        { upsert: true } // insert if not found
      );
    } catch (err) {
      console.error("Upsert error for", b.title, "-", err.message);
    }
  }
}

/**
 * Run the scraper
 */
async function run() {
  try {
    await connectDB();

    let pageUrl = BASE_URL;
    let total = 0;

    while (pageUrl) {
      const { books, nextUrl } = await scrapePage(pageUrl);
      await upsertBooks(books);

      total += books.length;
      console.log(
        `✅ Page done: saved/updated ${books.length} books. Next: ${nextUrl}`
      );

      pageUrl = nextUrl;

      // small polite delay (200ms)
      await new Promise((r) => setTimeout(r, 200));
    }

    console.log("🎉 Scraping finished. Total books processed:", total);
    process.exit(0);
  } catch (err) {
    console.error("❌ Scraper error:", err.message);
    process.exit(1);
  }
}

// Run only if called directly (not imported)
if (require.main === module) {
  run();
}

module.exports = { run };
