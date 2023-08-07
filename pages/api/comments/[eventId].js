import { connectDatabase, getDocuments, insertDocument } from '../../../helpers/db-utils';

async function handler(req, res) {
  const eventId = req.query.eventId;
  
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed' });
    client.close();
    return;
  }

  if (req.method === 'POST') {
    const email = req.body.email;
    const name = req.body.name;
    const text = req.body.text;

    if (!email || !email.includes('@') || !name || !text || name.trim() === '' || text.trim() === '') {
      res.status(422).json({ message: 'Check your entered inputs' });
      client.close();
      return;
    };

    const commentInfo =  {email: email, name: name, text: text};

    try {
      await insertDocument(client, 'comments-' + eventId, commentInfo);
      res.status(201).json({ comment: commentInfo });
      client.close()
    } catch {
      res.status(500).json('Inserting comment failed');
      client.close()
    }
  }

  if (req.method === 'GET') {
    let documents;

    try {
      documents = await getDocuments(client, 'comments-' + eventId);
      res.status(200).json({ comments: documents });
      client.close()
    } catch {
      res.status(500).json({ message: 'Loading comments failed' });
      client.close()
    }
  }
}

export default handler;