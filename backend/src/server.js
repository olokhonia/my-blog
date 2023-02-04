import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

const LOCAL_MONGODB = 'mongodb://localhost:27017';
const PORT = 8000;

const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect(LOCAL_MONGODB, { useNewUrlParser: true });
        const db = client.db('my-blog');

        await operations(db);
    
        client.close();
    } catch (error) {
        res.status(500).send('Error when tried to create/update/retrive data from db', error);
    };
}

app.get('/api/articles', async (req, res) => {
    await withDB(async (db) => {
        const articles = await db.collection('articles').find().toArray();
        res.status(200).json(articles);
    }, res);
});

app.get('/api/articles/:name', async (req, res) => {
    await withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(articleInfo);
    }, res);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    await withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
    
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1,
            }
        });
    
        const updatedArticlaInfo = await db.collection('articles').findOne({ name: articleName });
    
        res.status(200).json(updatedArticlaInfo);
    }, res);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    withDB(async (db) => {
        const { username, text } = req.body;
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: articleInfo.comments.concat({ username, text }),
            },
        });

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.get('*', (res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));