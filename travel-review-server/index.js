const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
let jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

//Middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d7ug9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access found 1' });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    })
}

async function run() {
    try {
        const placeCollection = client.db('placereview').collection('places');
        const reviews = client.db('placereview').collection('reviews');

        //jwt setup
        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ token })
        })

        //view first 3 places
        app.get('/places', async (req, res) => {
            const query = {};
            const limit = 3;
            const cursor = placeCollection.find(query).limit(limit);
            const places = await cursor.toArray();
            res.send(places);

        })
        //get all Places
        app.get('/all-places', async (req, res) => {
            const query = {};
            const cursor = placeCollection.find(query);
            const places = await cursor.toArray();
            res.send(places);
        })
        //see the place details
        app.get('/place/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await placeCollection.findOne(query);
            res.send(result);
        })
        //add new place
        app.post('/places', async (req, res) => {
            const place = req.body;
            const result = await placeCollection.insertOne(place);
            res.send(result);
        })
        //add review to database
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviews.insertOne(review);
            res.send(result);
        })
        //show all reviews
        app.get('/reviews', verifyJWT, async (req, res) => {
            const decoded = req.decoded;

            if (decoded.email !== req.query.email) {
                res.status(403).send({ message: 'unauthorized access found' })
            }
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviews.find(query).sort({ date: 'desc' });
            const result = await cursor.toArray();
            res.send(result);
        })
        //single service all review
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { serviceId: id };
            const cursor = reviews.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        //review delete
        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviews.deleteOne(query);
            res.send(result);
        })
        //get single review
        app.get('/single-reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviews.findOne(query);
            res.send(result);
        })
        // review UPdate
        app.put('/update-review/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const review = req.body;
            const option = { upsert: true };
            const updatedUser = {
                $set: {
                    message: review.message,
                }
            }
            const result = await reviews.updateOne(filter, updatedUser, option);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('Tourist review server is running');
})

app.listen(port, () => {
    console.log(`service review server running on ${port}`)
})