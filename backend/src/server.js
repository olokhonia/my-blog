import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');

        await operations(db);
    
        client.close();
    } catch (error) {
        res.status(500).send('Error when tried to create/update/retrive data from db', error);
    };
}

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

app.listen(8000, () => console.log('Listening port 8000'));