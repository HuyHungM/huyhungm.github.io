const ejs = require("ejs");
const app = require("express").Router();
const { join } = require("path");
const stringSimilarity = require('string-similarity');
const superagent = require('superagent');

app.get("/", async (req, res) => {

  try {

    ejs.renderFile(join(__dirname, "..", "views", "home.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

app.get("/anime/:id", async (req, res) => {


  try {

    let animeID = req.params.id

    ejs.renderFile(join(__dirname, "..", "views", "anime.html"), { animeID }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

app.get("/character/:id", async (req, res) => {


  try {

    let characterID = req.params.id

    ejs.renderFile(join(__dirname, "..", "views", "character.html"), { characterID }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

app.get("/person/:id", async (req, res) => {


  try {
    
    let personID = req.params.id

    ejs.renderFile(join(__dirname, "..", "views", "person.html"), { personID }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

app.get("/producer/:id", async (req, res) => {


  try {

    let producerID = req.params.id

    ejs.renderFile(join(__dirname, "..", "views", "producer.html"), { producerID }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

app.get("/popular", async (req, res) => {

  try {

    let page = req.query.page || 1;

    let listType = "Popular"
    let searchQuery = null

    ejs.renderFile(join(__dirname, "..", "views", "animeList.html"), { listType, searchQuery, page }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

app.get("/airing", async (req, res) => {

  try {

    let page = req.query.page || 1;

    let listType = "Airing"
    let searchQuery = null

    ejs.renderFile(join(__dirname, "..", "views", "animeList.html"), { listType, searchQuery, page }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

app.get("/upcoming", async (req, res) => {

  try {

    let page = req.query.page || 1;

    let listType = "Upcoming"
    let searchQuery = null

    ejs.renderFile(join(__dirname, "..", "views", "animeList.html"), { listType, searchQuery, page }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

app.get("/favorite", async (req, res) => {

  try {

    let page = req.query.page || 1;

    let listType = "Favorite"
    let searchQuery = null

    ejs.renderFile(join(__dirname, "..", "views", "animeList.html"), { listType, searchQuery, page }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

app.get("/search", async (req, res) => {

  try {

    let page = req.query.page || 1;
    let searchQuery = req.query.query

    let listType = "Search"

    ejs.renderFile(join(__dirname, "..", "views", "animeList.html"), { listType, searchQuery, page }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  } catch (e) {
    console.log(e)
    ejs.renderFile(join(__dirname, "..", "views", "404.html"), (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(html);
      }
    });
  }
});

module.exports = app;