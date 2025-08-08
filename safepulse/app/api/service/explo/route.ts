import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiPath = process.env.QUAD_CONFIG_API_PATH;
    if (!apiPath) {
      return NextResponse.json(
        { error: 'No valid API path configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const response = await fetch(`${apiPath}/service/explo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to process explo request');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in explo service:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
