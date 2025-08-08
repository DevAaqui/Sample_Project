import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Ensure the data directory exists
const DATA_DIR = '/tmp/data';
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper function to get file path for a plant
const getPlantFilePath = (plantId: string) => {
  return path.join(DATA_DIR, `plant_${plantId}_data.json`);
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
    const filePath = getPlantFilePath(plantId);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({});
    }

    // Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const plantData = JSON.parse(fileContent);

    return NextResponse.json(plantData);
  } catch (error) {
    console.error('Error reading plant data:', error);
    return NextResponse.json(
      { error: 'Failed to read plant data' },
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

    // Save to file
    const filePath = getPlantFilePath(plantId);
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error('Error saving plant data:', error);
    return NextResponse.json(
      { error: 'Failed to save plant data' },
      { status: 500 }
    );
  }
}
