import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

// Helper function to get Redis key for a plant
const getPlantRedisKey = (plantId: string) => {
  return `plant_${plantId}_measurements`;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const plantId = searchParams.get('plant_id');

  if (!plantId) {
    return NextResponse.json(
      { error: 'Plant ID is required' },
      { status: 400 }
    );
  }

  try {
    const redisKey = getPlantRedisKey(plantId);
    const measurements = await redis.get(redisKey);

    // If no measurements found in Redis, return empty object
    if (!measurements) {
      return NextResponse.json({});
    }

    // Parse the JSON value from Redis
    try {
      const parsedMeasurements = JSON.parse(measurements);
      return NextResponse.json(parsedMeasurements);
    } catch (error) {
      console.error('Error parsing measurements from Redis:', error);
      return NextResponse.json(
        { error: 'Invalid measurements data in Redis' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error reading meter type measurements:', error);
    return NextResponse.json(
      { error: 'Failed to read meter type measurements' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const plantId = searchParams.get('plant_id');

  if (!plantId) {
    return NextResponse.json(
      { error: 'Plant ID is required' },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    // Validate the request body
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Save to Redis
    const redisKey = getPlantRedisKey(plantId);
    await redis.set(redisKey, JSON.stringify(body));

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error('Error saving meter type measurements:', error);
    return NextResponse.json(
      { error: 'Failed to save meter type measurements' },
      { status: 500 }
    );
  }
}
