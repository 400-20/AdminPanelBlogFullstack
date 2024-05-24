import { clientPromise } from '../../../dbConfig/dbConfig';
import { ObjectId } from 'mongodb'; // Import ObjectId

export async function POST(req) {
    const client = await clientPromise;
    const db = client.db('test');
    
    try {
        let bodyObject = await req.json(); // Use await req.json() in Next.js 13
        let result = await db.collection('blogs').insertOne(bodyObject);
        return new Response(JSON.stringify(result.insertedId), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function GET() {
    const client = await clientPromise;
    const db = client.db('test');
    
    try {
        const posts = await db.collection('blogs').find({}).toArray();
        return new Response(JSON.stringify({ status: 200, data: posts }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function DELETE(req) {
    const client = await clientPromise;
    const db = client.db('test');
    const blogId = new URL(req.url).searchParams.get('id');

    try {
        const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(blogId) });
        return new Response(JSON.stringify({ deletedId: blogId }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PUT(req) {
    const client = await clientPromise;
    const db = client.db('test');
    const blogId = new URL(req.url).searchParams.get('id');
    let bodyObject = await req.json();

    try {
        const result = await db.collection('blogs').updateOne({ _id: new ObjectId(blogId) }, { $set: bodyObject });
        return new Response(JSON.stringify({ updatedId: blogId }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
