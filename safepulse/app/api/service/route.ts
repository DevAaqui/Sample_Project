import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { deserialize } from '../../../utils/serialization';

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
    console.log('Request body:', body);
    const payload = deserialize(body.payload);
    console.log('Payload:', payload);

    const url = `${apiPath}${payload.path}`;

    let response;
    switch (payload.method) {
      case 'PATCH':
        response = await axios.patch(url, payload.body);
        break;

      case 'DELETE':
        response = await axios.delete(url);
        break;

      case 'GET':
        response = await axios.get(url, { params: payload.params });
        break;

      case 'POST':
      default:
        response = await axios.post(url, payload.body);
        break;
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error handling request:', error);
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
