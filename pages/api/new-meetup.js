import { MongoClient } from 'mongodb';

async function handler(req,res) {
    if(req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb://127.0.0.1:27017/NextJS_Meetup_App');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});

    }
}

export default handler;