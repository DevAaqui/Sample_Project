import formidable from 'formidable';
import superagent from 'superagent';
import http from 'http';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// Update the API route configuration to use modern Next.js 13+ syntax
export const runtime = 'nodejs'; // Using Node.js runtime for file handling
export const dynamic = 'force-dynamic';

// Add other configs as needed
export const revalidate = 0; // If you need revalidation control

// Helper function to convert NextRequest to IncomingMessage-like object
async function nextRequestToIncomingMessage(
  request: NextRequest
): Promise<IncomingMessage> {
  const duplex = new Readable();
  const arrayBuffer = await request.arrayBuffer();
  duplex.push(Buffer.from(arrayBuffer));
  duplex.push(null);

  const headers = Object.fromEntries(request.headers);

  return Object.assign(duplex, {
    headers: {
      ...headers,
      'content-type': request.headers.get('content-type'),
      'content-length': request.headers.get('content-length'),
    },
    url: request.url,
    method: request.method,
  }) as unknown as IncomingMessage;
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const apiPath = process.env.QUAD_CONFIG_API_PATH;
    if (!apiPath) {
      return NextResponse.json(
        { error: 'No valid API path configured' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const response = await fetch(`${apiPath}/service/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in file upload:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
