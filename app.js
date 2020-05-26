const express = require('express');
const bodyParser = require('body-parser');
const model = require('./model');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`<L1> Welcome to Wiki Home page </L1>`);
});

/////////////////////////////////Handling routes for all articles//////////////////////////////////

app.route('/articles')
.get((req, res) => {
    model.DBUtility.findAllArticles((error, allArticles) => {
        if (!error) {
            res.json({message: allArticles});
        } else {
            res.json({message: error});
        } 
    });
})
.post(async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    try {
        const createdArticle = await model.DBUtility.createNewArticleInDB(title, content);
        res.status(200).json({message: 'created article ' + createdArticle.title + ' successfully', app: 'wiki-api'});
    } catch (err) {
        res.json({message: err});
    } 
})
.delete(async (req, res) => {
    try {
        const response = await model.DBUtility.deleteAllArticlesFromDB();
        res.json({message: response});
    } catch (err) {
        res.json({message: err});
    }
});

/////////////////////////////////Handling routes for a single article//////////////////////////////////

app.route('/articles/:articleTitle')
.get((req, res) => {
    model.DBUtility.findOneArticleByTitle(req.params.articleTitle, (error, foundArticle) => {
        if (!error) {
            res.json({message: foundArticle, app: 'wiki-api'});
        } else {
            res.json({message: error, app: 'wiki-api'});
        }
    });
})
.put(async (req, res) => {
    const articleTitle = req.params.articleTitle;
    const newArticleTitle = req.body.title;
    const newArticleContent = req.body.content;
    try {
        const response = await model.DBUtility.replaceArticleInDB(articleTitle, newArticleTitle, newArticleContent);
        res.json({message: 'Successfully overwritten article', matchedArticle: response.n, modifiedArticle: response.nModified, app: 'wiki-api'});
    } catch (err) {
        res.json({message: err, app: 'wiki-api'});
    }
})
.patch(async (req, res) => {
    const articleTitle = req.params.articleTitle;
    try {
        const response = await model.DBUtility.updateArticleInDB(articleTitle, req.body);
        res.json({message: 'Successfully modified article', updatedArticle: response, app: 'wiki-api'});
    } catch (err) {
        res.json({message: err, app: 'wiki-api'});
    }
})
.delete(async (req, res) => {
    try {
        const response = await model.DBUtility.deleteOneArticleByTitleFromDB(req.params.articleTitle);
        res.json({message: response, app: 'wiki-api'});
    } catch (err) {
        res.json({message: err, app: 'wiki-api'});
    }  
});

//////// DELETING ARTICLE BY ID ////////////

app.delete('/articles/article/:id', async (req, res) => {
    const articleID = req.params.id;
    console.log(`articleID: ${articleID}`);
    try {
        
        const response = await model.DBUtility.deleteOneArticleByIdFromDB(articleID);
        res.json({message: response, app: 'wiki-api'});
    } catch (err) {
        res.json({message: err, app: 'wiki-api'});
    }
});

app.get("*", (req, res) =>
  res
    .status(404)
    .json({ message: 'Route does not exist', app: 'wiki-api' })
);

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});