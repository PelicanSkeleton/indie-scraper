var cheerio = require("cheerio");
var puppeteer = require("puppeteer");
var axios = require("axios");
var db = require("../models")



module.exports = {
    scrapeBarsuk: async function (req, res) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://www.barsuk.com/home');

        const result = await page.evaluate(() => {
            let barsuk = [];
            var noArticle = 0;

            const titles = document.querySelectorAll('.news_blurb');

            for (i = 0; i < titles.length; i++) {
                const articles = titles[i];
                let title = articles.children[1].innerText;
                let link = articles.children[0].children[0].href;

                barsuk.push({
                    title: title,
                    link: link
                });
                db.Article.find({})
                    .then(function (barsuk) {
                        for (i = 0; i < barsuk.length; i++) {
                            if (barsuk[i].title !== title) {
                                noArticle++;
                            }
                        }
                        if (noArticle === barsuk.length) {
                            db.Article.create(article)
                                .then(function (dbArticle) {
                                    console.log(dbArticle);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                            noArticle = 0;
                        } else {
                            noArticle = 0;
                        }
                    })
                    .catch(function (err) {
                        return res.end(err);
                    });
            }
            res.json({ message: "Barsuk scrape complete." });
            return barsuk;
        });

        browser.close();
        return result;
    },

    // scrapeBarsuk().then((result) => {
    //     console.log("Barsuk: ");
    //     console.log(result);
    //     console.log("\n");
    //     res.json(result);
    // })

    scrapeDischord: function (req, res) {
        axios.get("https://www.dischord.com").then(function (response) {
            var $ = cheerio.load(response.data);
            var dischord = [];

            var noArticle = 0;

            $("h2").each(function (i, element) {
                var title = $(element).children().text();
                var link = $(element).find("a").attr("href");

                dischord.push({
                    title: title,
                    link: link
                });


                db.Article.find({})
                    .then(function (data) {
                        for (i = 0; i < data.length; i++) {
                            if (data[i].title !== title) {
                                noArticle++;
                            }
                        }
                        console.log(noArticle);
                        console.log(data.length);
                        if (noArticle === data.length) {
                            db.Article.create(article)
                                .then(function (dbArticle) {
                                    console.log(dbArticle);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                            noArticle = 0;
                        } else {
                            noArticle = 0;
                        }
                    })
                    .catch(function (err) {
                        return res.end(err);
                    });
            });
            var scrapedDischord = JSON.stringify(dischord);
            res.json(scrapedDischord);
            // res.json(dischord);
            // res.json({ message: "Dischord scrape complete." });
            console.log("Dischord: ");
            console.log(dischord);
            console.log("\n");
        });
    },

    // scrapeDischord();

    scrapeJadetree: function (req, res) {
        axios.get("https://www.jadetree.com/news").then(function (response) {
            var $ = cheerio.load(response.data);
            var jadetree = [];
            var noArticle = 0;

            $("h1").each(function (i, element) {
                var title = $(element).children().text();
                var link = $(element).find("a").attr("href");

                jadetree.push({
                    title: title,
                    link: link
                });
                db.Article.find({})
                    .then(function (jadetree) {
                        for (i = 0; i < jadetree.length; i++) {
                            if (jadetree[i].title !== title) {
                                noArticle++;
                            }
                        }
                        if (noArticle === jadetree.length) {
                            db.Article.create(article)
                                .then(function (dbArticle) {
                                    console.log(dbArticle);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                            noArticle = 0;
                        } else {
                            noArticle = 0;
                        }
                    })
                    .catch(function (err) {
                        return res.end(err);
                    });
            });
            res.json({ message: "Jadetree scrape complete." });
            console.log("Jadetree: ");
            console.log(jadetree);
            console.log("\n");
            res.json(jadetree);
        });
    },

    // scrapeJadetree();

    scrapeSubpop: function (req, res) {
        axios.get("https://www.subpop.com/news/category/news").then(function (response) {
            var $ = cheerio.load(response.data);
            var subpop = [];
            var noArticle = 0;

            $(".news-title").each(function (i, element) {
                var title = $(element).children().text();
                var link = $(element).find("a").attr("href");

                subpop.push({
                    title: title,
                    link: link
                });
                db.Article.find({})
                    .then(function (subpop) {
                        for (i = 0; i < subpop.length; i++) {
                            if (subpop[i].title !== title) {
                                noArticle++;
                            }
                        }
                        if (noArticle === subpop.length) {
                            db.Article.create(article)
                                .then(function (dbArticle) {
                                    console.log(dbArticle);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                            noArticle = 0;
                        } else {
                            noArticle = 0;
                        }
                    })
                    .catch(function (err) {
                        return res.end(err);
                    });
            });
            res.json({ message: "Subpop scrape complete." });
            console.log("Subpop: ");
            console.log(subpop);
            console.log("\n");
            res.json(subpop);
        });
    },

    // scrapeSubpop();

    scrapePolyvinyl: async function (req, res) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://polyvinylrecords.com/news');

        const result = await page.evaluate(() => {
            let polyvinyl = [];
            const titles = document.querySelectorAll('.news-item');
            var noArticle = 0;

            for (i = 0; i < titles.length; i++) {
                const articles = titles[i];
                let title = articles.innerText.split("\n");
                let link = articles.children[0].href;

                polyvinyl.push({
                    title: title,
                    link: link
                });
                db.Article.find({})
                    .then(function (polyvinyl) {
                        for (i = 0; i < polyvinyl.length; i++) {
                            if (polyvinyl[i].title !== title) {
                                noArticle++;
                            }
                        }
                        if (noArticle === polyvinyl.length) {
                            db.Article.create(article)
                                .then(function (dbArticle) {
                                    console.log(dbArticle);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                            noArticle = 0;
                        } else {
                            noArticle = 0;
                        }
                    })
                    .catch(function (err) {
                        return res.end(err);
                    });
            }
            res.json({ message: "Polyvinyl scrape complete." });
            return polyvinyl;

        });
        browser.close();
        return result;
    },

    // scrapePolyvinyl().then((result) => {
    //     console.log("Polyvinyl:");
    //     console.log(result);
    //     console.log("\n");
    //     res.json(result);
    // });

    scrapeTopshelf: async function (req, res) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto("https://www.topshelfrecords.com/news");

        const result = await page.evaluate(() => {
            topshelf = [];
            const titles = document.querySelectorAll(".header");
            var noArticle = 0;

            for (i = 0; i < 10; i++) {
                const articles = titles[i];
                let title = articles.innerText;
                let link = "https://www.topshelfrecords.com/news";

                topshelf.push({
                    title: title,
                    link: link
                });
                db.Article.find({})
                    .then(function (topshelf) {
                        for (i = 0; i < topshelf.length; i++) {
                            if (polyvinyl[i].title !== title) {
                                noArticle++;
                            }
                        }
                        if (noArticle === polyvinyl.length) {
                            db.Article.create(article)
                                .then(function (dbArticle) {
                                    console.log(dbArticle);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                            noArticle = 0;
                        } else {
                            noArticle = 0;
                        }
                    })
                    .catch(function (err) {
                        return res.end(err);
                    })
            }
            res.json({ message: "Topshelf scrape complete." });
            return topshelf;
        });

        browser.close();
        return result;

    },

    // scrapeTopshelf().then((result) => {
    //     console.log("Topshelf: ");
    //     console.log(result);
    //     console.log("\n");
    //     res.json(result);
    // })

    savedArticles: function (req, res) {
        db.Article.find({ saved: true }).sort({ created: -1 }).limit(20).populate("note")
            .then(function (dbFound) {
                res.json(dbFound)
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                }
            });
    },

    getAllArticles: function (req, res) {
        db.Article.find({}).sort({ created: -1 }).limit(20).populate("note")
            .then(function (dbFound) {
                res.json(dbFound)
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                }
            });
    },

    getArticlesById: function (req, res) {
        var id = req.params.id;
        db.Article.findOne({ _id: id })
            .populate("note")
            .then(function (dbFound) {
                res.json(dbFound);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    remove: function (req, res) {
        db.Article.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    removeNote: (req, res) => {
        db.Article.findByIdAndUpdate(req.params.id, {$pull: {note: req.body.noteId}})
        .then(function(edited) {
            res.json(edited);
        })
        .catch(function(error) {
            res.end(error);
        });
    }
};