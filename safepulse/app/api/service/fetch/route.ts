import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { deserialize } from '@/utils/serialization';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// Cache storage
const cache = new Map<string, { data: any; timestamp: number }>();
// Environment cache
let environmentCache: { data: any; timestamp: number } | null = null;
const ENV_CACHE_DURATION = 5; // Cache environments for 5 minutes
// Path override from environment variable
const overrideEnvPaths = process.env.OVERRIDE_ENVPATHS
  ? JSON.parse(process.env.OVERRIDE_ENVPATHS)
  : {};

// Timing utility functions
function startTimer() {
  return process.hrtime();
}

function getElapsedTime(startTime: [number, number]): number {
  const [seconds, nanoseconds] = process.hrtime(startTime);
  return seconds * 1000 + nanoseconds / 1000000; // Convert to milliseconds
}

function logTimingSummary(timings: Record<string, number>) {
  console.log('=== Request Timing Summary ===');
  Object.entries(timings).forEach(([operation, time]) => {
    console.log(`${operation}: ${time.toFixed(2)}ms`);
  });
  console.log('============================');
}

function getCacheKey(url: string, method: string, params?: any, body?: any) {
  return JSON.stringify({ url, method, params, body });
}

function isCacheValid(timestamp: number, cacheDuration: number) {
  const now = Date.now();
  const expiryTime = timestamp + cacheDuration * 60 * 1000; // Convert minutes to milliseconds
  return now < expiryTime;
}

// Function to fetch environment configurations
async function fetchEnvironmentConfigs() {
  const startTime = startTimer();

  // Check if we have a valid cache
  if (
    environmentCache &&
    isCacheValid(environmentCache.timestamp, ENV_CACHE_DURATION)
  ) {
    const elapsedTime = getElapsedTime(startTime);
    console.log('Using cached environment configurations', {
      cacheAge: `${Math.round((Date.now() - environmentCache.timestamp) / 1000)}s`,
      envCount: environmentCache.data.length,
      fetchTime: `${elapsedTime.toFixed(2)}ms`,
    });
    return { data: environmentCache.data, timing: elapsedTime };
  }

  try {
    // Use the absolute URL since we're on the server side
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_URL ||
      'http://localhost:3000';
    console.log(
      `Fetching environment configurations from ${baseUrl}/api/environment`
    );

    const response = await axios.get(`${baseUrl}/api/environment`);
    const elapsedTime = getElapsedTime(startTime);

    console.log('Successfully fetched environment configurations', {
      count: response.data.length,
      environments: response.data.map((env: any) => env.environment).join(', '),
      fetchTime: `${elapsedTime.toFixed(2)}ms`,
    });

    // Update cache
    environmentCache = {
      data: response.data,
      timestamp: Date.now(),
    };

    return { data: response.data, timing: elapsedTime };
  } catch (error) {
    const elapsedTime = getElapsedTime(startTime);
    console.error('Error fetching environment configurations:', error);
    // Fall back to environment variable if API call fails
    try {
      console.log('Falling back to QUAD_CONFIG_API_PATHS environment variable');
      const fallbackData = JSON.parse(
        process.env.QUAD_CONFIG_API_PATHS || '[]'
      );

      // Transform old format to new format if needed
      const transformedData = fallbackData.map((item: any) => {
        if (item.ENV && !item.environment) {
          return {
            ...item,
            environment: item.ENV,
            api_path: item.API_PATH || item.api_path,
          };
        }
        return item;
      });

      console.log('Successfully parsed fallback environment data', {
        count: transformedData.length,
        environments: transformedData
          .map((env: any) => env.environment)
          .join(', '),
        fetchTime: `${elapsedTime.toFixed(2)}ms`,
      });

      // Update cache with fallback data
      environmentCache = {
        data: transformedData,
        timestamp: Date.now(),
      };
      return { data: transformedData, timing: elapsedTime };
    } catch (parseError) {
      console.error(
        'Failed to parse fallback environment configuration:',
        parseError
      );
      return { data: [], timing: elapsedTime };
    }
  }
}

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
    const response = await fetch(`${apiPath}/service/fetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch service data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in service fetch:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
