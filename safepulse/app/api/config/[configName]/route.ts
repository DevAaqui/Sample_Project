import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint to fetch configuration values by name
 * This allows client-side code to access environment variables without exposing them directly
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { configName: string } }
) {
  try {
    const { configName } = params;

    // Convert the config name to the environment variable format (with QUAD_CONFIG_ )
    const envVarName = `QUAD_CONFIG_${configName}`;

    // Get the value from environment variables
    const value = process.env[envVarName];

    // If the value doesn't exist, return 404
    if (value === undefined) {
      return NextResponse.json(
        { error: `Configuration '${configName}' not found` },
        { status: 404 }
      );
    }

    // Return the value
    return NextResponse.json({ value });
  } catch (error) {
    console.error('Error fetching configuration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
