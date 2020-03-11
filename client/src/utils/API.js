import axios from "axios";

export default {
    scrapeBarsuk: () => axios.get("/api/articles/scrape"),
    scrapeDischord: () => axios.get("/api/articles/scrape"),
    scrapeJadetree: () => axios.get("/api/articles/scrape"),
    scrapeSubpop: () => axios.get("/api/articles/scrape"),
    scrapePolyvinyl: () => axios.get("/api/articles/scrape"),
    scrapeTopshelf: () => axios.get("/api/articles/scrape"),
    getAllArticles: () => axios.get("api/articles/"),
    getArticleById: articleId => axios.get(`/api/articles/${articleId}`),
    removeArticle: id => axios.delete(`/api/article/${id}`),
    getSavedArticles: userId => axios.get(`/api/users/saved-article/${userId}`),
    addSavedArticle: (userId, data) => axios.put(`/api/users/saved-article/${userId}`, data),
    removeSavedArticle: (userId, data) => axios.put(`/api/users/saved-article/remove/${userId}`, data),
};