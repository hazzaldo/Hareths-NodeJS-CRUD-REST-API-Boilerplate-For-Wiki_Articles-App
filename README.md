# Hareths-NodeJS-CRUD-REST-API-Boilerplate-For-Wiki_Articles-App

In this small project, I built from scratch my very own complete Restful APIs, using Node JS (Express) server and MongoDB database to store the data. The project simulates a backend server with API services to serve functionality for a Wiki articles type application. 


## Installation + Prerequisites

- First you will need to clone the website locally using the command below:

```bash
git clone https://github.com/hazzaldo/Hareths-NodeJS-CRUD-REST-API-Boilerplate-For-Wiki_Articles-App.git
```
- You need to make sure you have the latest [Node JS](https://nodejs.org/en/) installed. 

- Open the project in any code editor - e.g. Atom, VSCode, Sublime (I personally use VSCode).

- You also need to have [MongoDB](https://www.mongodb.com/) locally installed and configured. This is optional: you can also install a MongoDB client interface such as [Robot T3](https://robomongo.org/) which will simplify interaction with MongoDB databases.

- Now, open a terminal window and navigate to the project root directory. Then run the command below, to install all project required dependencies/packages:

```javascript

npm install
```

## Setup
Open two terminal windows - one the command to connect to the MongDB database and the other to launch the website. In both terminal windows make sure you navigate to the project root directory. Otherwise the next steps will NOT work. 

In the first terminal window, run the command below to connect to and spin-up a MongoDB database server: 
```
mongod
```
In the second terminal window, run the command below to launch website:
```
nodemon app.js
```
You should see the message below in the terminal, which indicates the website has launched successfully:
```
[nodemon] starting `node app.js`
Server started on port 3000
Server connected successfully to MongoDB
```

The base URL: `http://localhost:3000/` . 

## Swagger
>Visit `http://localhost:3000/api-docs` to view the the OPENAPI document in Swagger-UI

<img src=images/swagger-doc.JPG>

## Usage

>#### List all articles
<img src=images/GET_articles.JPG>

>#### POST (Create) Article
<img src=images/POST_articles.JPG>

> Article created in MongoDB database

<img src=images/POST_articles_added_article_to_DB.JPG>

>#### GET by Article Title
<img src=images/GET_articles_{articleTitle}.JPG>

>#### PUT (update/replace) Article by Article Title
<img src=images/PUT_articles_{articleTitle}.JPG>

>Article updated/replaced in MongoDB database

<img src=images/PUT_articles_replaced_article_in_DB.JPG>

>#### PATCH (update) Article by Article Title
<img src=images/PATCH_articles_{articleTitle}.JPG>

>Article in MongoDB database, before making PATCH request

<img src=images/PATCH_articles_before_update_article_title_in_DB.JPG>

>Article in MongoDB database, after making PATCH request

<img src=images/PATCH_articles_after_update_article_title_in_DB.JPG>

>#### DELETE Article by Article Title
<img src=images/DELETE_articles_{articleTitle}.JPG>

>#### DELETE Article by Article ID
<img src=images/DELETE_articles_article_{id}.JPG>

>Existing article in MongoDB, to be deleted by ID

<img src=images/DELETE_articles_before_by_article_ID.JPG>

>#### DELETE all Articles
<img src=images/DELETE_articles.JPG>

#### Wiki Articles JSON file
I have also provide a JSON file with example articles, in the correct format, that you can use (copy and paste) to experiment with the APIs. Please refer to the `wiki-articles-examples.json` file in the root directory of the project.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
