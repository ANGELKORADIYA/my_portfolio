"use server";
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB connection URI

export async function POST(req) {
  try {
    // Parse the incoming request body
    const body = await req.json();

    // Check if the name and password match
    if (body.name === "ak47" && body.password === "ak@123") {
      // Connect to MongoDB
      const client = await MongoClient.connect(uri);
      const db = client.db('my_portfolio'); // Replace with your database name

      // Fetch all messages from the 'messages' collection
      const messages = await db.collection('messages').find({}).toArray();

      // Close the MongoDB connection
      await client.close();

      // Return the messages as a JSON response
      return new Response(JSON.stringify(messages), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Unauthorized access (wrong credentials)
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // Handle any errors
    return new Response(JSON.stringify({ error: 'Error fetching messages' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}