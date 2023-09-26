// pages/api/chat.js
import { ChatManager } from '@/core/ChatManager';
import { NextResponse } from 'next/server';
export async function POST(request: Request): Promise<NextResponse> {
  if (request.method !== 'POST') {
    return NextResponse.json({}, { status: 405 });  // Method Not Allowed
  }

  // Read and parse the request body
  const requestBody = await request.json();
  const { prompt } = requestBody;
  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    const chatManagerInstance = new ChatManager();

    const chatResponse = await chatManagerInstance.processChat('How to use vending machine?');

    // Convert chatResponse to a string or JSX element
    const chat = chatResponse ? chatResponse : 'Null';
    return NextResponse.json(chat);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
