import { MongoClient } from 'mongodb';

async function handler(req,res) {
    if(req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect("mongodb+srv://salonighag2001:IuIsHuP1PCasyQKj@cluster0.toalro8.mongodb.net/NextJS_Meetups_App?retryWrites=true&w=majority");
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});

    }
}

export default handler;