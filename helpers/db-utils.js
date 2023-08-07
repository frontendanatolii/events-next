import { MongoClient } from 'mongodb';

export async function connectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://probro12356:DiBdcj3xMUhjzymO@cluster0.a6dxxho.mongodb.net/events-next?retryWrites=true&w=majority');
    return client
};

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
};


export async function getDocuments(client, collection) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort({ _id: 1 })
    .toArray();

  return documents;
}