const express = require('express');
const bodyParser = require('body-parser');
const model = require('./model');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// get swaggerUI to server the swaggerDocs we generated from the swaggerOptions we specified
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

////////////////////////////////// ROUTES /////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.status(200).send(`<L1> Welcome to Wiki Home page. Please visit the '/api-docs' url path to review the API doc.</L1>`);
});

/////////////////////////////////Handling routes for all articles//////////////////////////////////

app.route('/articles')
.get((req, res) => {
    model.DBUtility.findAllArticles((err, allArticles) => {
        if (!err) {
            res.status(200).json({allArticles});
        } else {
            res.json({error: err});
        } 
    });
})
.post(async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    try {
        const createdArticle = await model.DBUtility.createNewArticleInDB(title, content);
        res.status(200).json({message: 'created article ' + createdArticle.title + ' successfully'});
    } catch (err) {
        res.json({error: err});
    } 
})
.delete(async (req, res) => {
    try {
        const response = await model.DBUtility.deleteAllArticlesFromDB();
        res.status(200).json({message: response});
    } catch (err) {
        res.json({error: err});
    }
});

/////////////////////////////////Handling routes for a single article//////////////////////////////////

app.route('/articles/:articleTitle')
.get((req, res) => {
    model.DBUtility.findOneArticleByTitle(req.params.articleTitle, (err, foundArticle) => {
        if (!err) {
            res.status(200).json({foundArticle});
        } else {
            res.json({error: err});
        }
    });
})
.put(async (req, res) => {
    const articleTitle = req.params.articleTitle;
    const newArticleTitle = req.body.title;
    const newArticleContent = req.body.content;
    try {
        const response = await model.DBUtility.replaceArticleInDB(articleTitle, newArticleTitle, newArticleContent);
        res.status(200).json({message: 'Successfully overwritten article', matchedArticle: response.n, modifiedArticle: response.nModified});
    } catch (err) {
        res.json({error: err});
    }
})
.patch(async (req, res) => {
    const articleTitle = req.params.articleTitle;
    try {
        const response = await model.DBUtility.updateArticleInDB(articleTitle, req.body);
        res.status(200).json({message: 'Successfully modified article', updatedArticle: response});
    } catch (err) {
        res.json({error: err});
    }
})
.delete(async (req, res) => {
    try {
        const response = await model.DBUtility.deleteOneArticleByTitleFromDB(req.params.articleTitle);
        res.status(200).json({message: response});
    } catch (err) {
        res.json({error: err});
    }  
});

//////// DELETING ARTICLE BY ID ////////////

app.delete('/articles/article/:id', async (req, res) => {
    const articleID = req.params.id;
    console.log(`articleID: ${articleID}`);
    try {
        
        const response = await model.DBUtility.deleteOneArticleByIdFromDB(articleID);
        res.status(200).json({message: response});
    } catch (err) {
        res.json({error: err});
    }
});

//////////////////////////////////////// ERROR HANDLING /////////////////////////////////////////////////

// Handle any other undefined route as a 404 with custom error message
app.use((req, res, next) => {
    const err = new Error("Failed. Article not found");
    err.status = 404;
    next(err);
});
  
// Error Handler: pass error(s) object(s) for express to handle here from any other request, using 'next(err)'. Here we either output the error caught, if status is not set on error then set error status to 500
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            // send the error message to the client
            message: err.message
        }
    })
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});