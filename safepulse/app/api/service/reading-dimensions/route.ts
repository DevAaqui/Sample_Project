import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  // Get plant_id from query params
  const { searchParams } = new URL(request.url);
  const plantId = searchParams.get('plant_id');

  if (!plantId) {
    return NextResponse.json(
      { error: 'Plant ID is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `http://quad-data-service.quadrical.ai/reading_dim?plant_id=${plantId}&reading_cat=measurement&reading_cat=derived&reading_cat=calculated`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching reading dimensions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reading dimensions' },
      { status: 500 }
    );
  }
}
