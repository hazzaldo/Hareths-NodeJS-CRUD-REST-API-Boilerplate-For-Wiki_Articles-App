const mongoose = require('mongoose');

//connect to DB
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, 
(err) => {
    try {
        console.log(`Server connected successfully to MongoDB`);
    } catch (err) {
        console.log(err);
    }
});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model('Article', articleSchema);

class DBUtility {

    static findOneArticleByID(articleID, callBack) {
        Article.findOne({_id: articleID}, (err, foundArticle) => {
            let article = null;
            let error = null;
            if (err) {
                error = err;         
            } else {
                article = foundArticle
            }
            callBack(error, article);
        });
    }

    static findOneArticleByTitle(articleTitle, callBack) {
        Article.findOne({title: articleTitle}, (err, foundArticle) => {
            let article = null;
            let error = null;
            if (err) {
                error = err;         
            } else {
                article = foundArticle
            }
            callBack(error, article);
        });
    }

    static findAllArticles(callBack) {
        Article.find({}, (err, allArticles) => {
            let articles = null;
            let error = null;
            if (err) {
                error = err;
            } else {
                articles = allArticles;
            }  
            callBack(error, allArticles);
        });
    }
  
    static createNewArticleInDB(articleTitle, articleContent) {
        return new Promise((resolve, reject) => {
            const article = new Article({
                title: articleTitle,
                content: articleContent
            });
            article.save(err => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(`created article ${article.title} successfully.`);
                    resolve(article);
                }
            });
        });
    }

    static replaceArticleInDB(articleTitle, newArticleTitle, newArticleContent) {
        return new Promise((resolve, reject) => {
            Article.replaceOne(
                {title: articleTitle},
                {title: newArticleTitle, content: newArticleContent},
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                }
            );
        });
    }

    static updateArticleInDB(articleTitle, updateObject) {
            return new Promise((resolve, reject) => {
            Article.findOneAndUpdate(
                {title: articleTitle}, 
                {$set: updateObject},
                {new: true}, 
                (err, updatedArticle) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(updatedArticle);
                }
            });
        });
    }

    static deleteAllArticlesFromDB() {
        return new Promise((resolve, reject) => {
            Article.deleteMany({}, err => {
                if (!err) {
                    resolve(`Successfully deleted all articles.`);
                } else {
                    reject(err);
                }
            });
        });
    }

    static deleteOneArticleByTitleFromDB(articleTitle) {
        return new Promise((resolve, reject) => {
            Article.deleteOne({title: articleTitle}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Deleted article ${articleTitle} successfully`);
                }
            });
        });
    }
  
    static deleteOneArticleByIdFromDB(articleID) {
        console.log(`articleID: ${articleID}`);
        return new Promise((resolve, reject) => {
            Article.findByIdAndDelete(articleID, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Deleted article ${articleID} successfully`);
                }
            });
        });
    }
}

exports.DBUtility = DBUtility;