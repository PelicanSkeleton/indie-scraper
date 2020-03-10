var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var puppeteer = require("puppeteer");
var axios = require("axios");
var db = require("../../models")


router.get("/api/scrape", (req, res) => {
    let scrapeBarsuk = async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://www.barsuk.com/home');

        const result = await page.evaluate(() => {
            let barsuk = [];

            const titles = document.querySelectorAll('.news_blurb');

            for (i = 0; i < titles.length; i++) {
                const articles = titles[i];
                let title = articles.children[1].innerText;
                let link = articles.children[0].children[0].href;

                barsuk.push({
                    title: title,
                    link: link
                });
            }
            return barsuk;
        });

        browser.close();
        return result;
    }

    scrapeBarsuk().then((result) => {
        console.log("Barsuk: ");
        console.log(result);
        console.log("\n");
    })

    axios.get("https://www.dischord.com").then(function (response) {
        var $ = cheerio.load(response.data);
        var dischord = [];

        $("h2").each(function (i, element) {
            var title = $(element).children().text();
            var link = $(element).find("a").attr("href");

            dischord.push({
                title: title,
                link: link
            });
        });

        console.log("Dischord: ");
        console.log(dischord);
        console.log("\n");
    });

    axios.get("https://www.jadetree.com/news").then(function (response) {
        var $ = cheerio.load(response.data);
        var jadetree = [];

        $("h1").each(function (i, element) {
            var title = $(element).children().text();
            var link = $(element).find("a").attr("href");

            jadetree.push({
                title: title,
                link: link
            });
        });

        console.log("Jadetree: ");
        console.log(jadetree);
        console.log("\n");
    });

    axios.get("https://www.subpop.com/news/category/news").then(function (response) {
        var $ = cheerio.load(response.data);
        var subpop = [];

        $(".news-title").each(function (i, element) {
            var title = $(element).children().text();
            var link = $(element).find("a").attr("href");

            subpop.push({
                title: title,
                link: link
            });
        });

        console.log("Subpop: ");
        console.log(subpop);
        console.log("\n");
    });

    let scrapePolyvinyl = async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://polyvinylrecords.com/news');

        const result = await page.evaluate(() => {
            let polyvinyl = [];
            const titles = document.querySelectorAll('.news-item');


            for (i = 0; i < titles.length; i++) {
                const articles = titles[i];
                let title = articles.innerText.split("\n");
                let link = articles.children[0].href;

                polyvinyl.push({
                    title: title,
                    link: link
                });
            }
            return polyvinyl;

        });
        browser.close();
        return result;
    }

    scrapePolyvinyl().then((result) => {
        console.log("Polyvinyl:");
        console.log(result);
        console.log("\n");
    });

    let scrapeTopshelf = async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto("https://www.topshelfrecords.com/news");

        const result = await page.evaluate(() => {
            topshelf = [];
            const titles = document.querySelectorAll(".header");

            for (i = 0; i < 10; i++) {
                const articles = titles[i];
                let title = articles.innerText;
                let link = "https://www.topshelfrecords.com/news";

                topshelf.push({
                    title: title,
                    link: link
                });
            }
            return topshelf;
        });

        browser.close();
        return result;

    }

    scrapeTopshelf().then((result) => {
        console.log("Topshelf: ");
        console.log(result);
        console.log("\n");
    })

});

router.post("api/saved", function (req, res) {
    // Create a new Article using the `result` object built from scraping
    const result = {
        title: "test title",
        link: "test link"
    }
    db.Article.create(result)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
})

module.exports = router;