import express, { Router } from "express";

import axios from 'axios';
import News from "../../models/News.js";

const router = Router();
const CRYPTOCOMPARE_NEW_URL = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";

const getTodayStart = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.floor(now.getTime() / 1000);

}

router.get('/', async (req, res) => {
  try {
    const todayUnix = getTodayStart();

    const todayNews = await News.find({ published_on: { $gte: todayUnix } }).sort({ published_on: -1 })

    if (todayNews.length > 0) {
      console.log("Serving from DB");
      return res.json(todayNews);
    }

    // If not found in the database

    console.log("Fetching from the cryptocompare api");
    const { data } = await axios.get(CRYPTOCOMPARE_NEW_URL);

    if (!data?.Data) {
      return res.json("No news data found on the cryptocompare api");
    }

    const newsItem = data.Data;
    const savedNews = [];

    for (const item of newsItem) {
      const exists = await News.findOne({ id: item.id });
      if (!exists) {
        const newsDoc = new News({
          id: item.id,
          guid: item.guid,
          published_on: item.published_on,
          image_url: item.imageurl,
          title: item.title,
          url: item.url,
          body: item.body,
          tags: item.tags,
          lang: item.lang,
          // upvotes: parseInt(item.upvotes) || 0,
          // donwVotes: parseInt(item.donwVotes) || 0,
          categories: item.categories,
          source_info: item.source_info,
          source: item.source,

        });
        await newsDoc.save();
        savedNews.push(newsDoc);
      }
    }

    console.log(`Saved ${savedNews.length} news articles`)

    const updatedTodaysNews = await News.find().sort({ published_on: -1 });
    res.json(updatedTodaysNews);


  } catch (error) {
    console.log("There was an error: ", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });


  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await News.findOne({ id });
    if (!article) {
      return res.json(404).json({
        message: "News article not found"
      })
    }
    res.status(200).json(article)


  } catch (error) {
    console.log("Internal Server Error: ", error);
    res.status(500).json({ error: error.message });
  }

})

export default router;
