### Pants Shop

## build instructions
you will need node.js and mongo
to install node -> https://nodejs.org/en/download/
to install mongod -> https://docs.mongodb.com/manual/installation/

## build 
cd into the directory, run npm install to install dependencies
'npm run load' to load csv models into database and run the server
'npm start' to run server, it will be running on port 3000

##approach taken
I node.js with express to build a quick lightweight app, that connects to mongodb to retrieve data.
The html is server side rendered with pug used as the templating library, I assumed a full front end framework would be an overkill. I have done some basic styling with bootstrap to make the page responsive.
I used mongodb for the database, it is fast to get up and running. I used mongoose as a lightwight orm. The mongoose models and db connection logic is defined in models.

the parsing and database inserting logic is in scripts/readCsvAndSaveToDB.js , I also clear the database fo all the previous models in case there are any.

I decided to render server side using pug as templating library. The front end is static, if I had more time I thought of hiding inventory data and maybe magnifying the images on muosehover.

file with build instructions, an explanation of the approach you took, and 

##potential improvements
- I could have spent spent more time styling the website, it is somewhat ugly :( . 
- I could have added tests for the api endpoints. 
- Added interactivity on the front end.
- I load all the documents from the databases so for my implementation db indices were not required, but I added them anyway in case there would be a need for loading a specific product.
- I do the join of the models in memory, this is not scalable, you can do joins with mongodb by using references to other documents ids which would be preferable.
