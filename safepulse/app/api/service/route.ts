import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiPath =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    if (!apiPath) {
      return NextResponse.json(
        { error: "No valid API path configured" },
        { status: 500 }
      );
    }

    // Get the endpoint from query parameters
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json(
        { error: "Endpoint parameter is required" },
        { status: 400 }
      );
    }

    const token = req.headers.get("authorization");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = token;
    }

    console.log("Service GET request:", `${apiPath}${endpoint}`);

    const response = await fetch(`${apiPath}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      return NextResponse.json(
        { error: errorData.message || "Request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Service GET response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in service GET:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const apiPath =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    if (!apiPath) {
      return NextResponse.json(
        { error: "No valid API path configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log("Service request body:", body);

    // Get endpoint from request body or determine based on content
    let endpoint = body.endpoint;

    // If no endpoint specified, try to determine from content (for backward compatibility)
    if (!endpoint) {
      if (body.username && body.firstName && body.lastName) {
        endpoint = "/auth/register";
      } else if (body.email && body.password && !body.username) {
        endpoint = "/auth/login";
      } else {
        return NextResponse.json(
          { error: "Endpoint is required in request body" },
          { status: 400 }
        );
      }
    }

    console.log("Service POST request:", `${apiPath}${endpoint}`);

    const token = req.headers.get("authorization");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = token;
    }

    const response = await fetch(`${apiPath}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body.payload || body),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      return NextResponse.json(
        { error: errorData.message || "Request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Service POST response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in service POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const apiPath =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    if (!apiPath) {
      return NextResponse.json(
        { error: "No valid API path configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log("Service PUT request body:", body);

    // Get endpoint from request body
    const endpoint = body.endpoint;
    if (!endpoint) {
      return NextResponse.json(
        { error: "Endpoint is required in request body" },
        { status: 400 }
      );
    }

    const token = req.headers.get("authorization");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = token;
    }

    console.log("Service PUT request:", `${apiPath}${endpoint}`);

    const response = await fetch(`${apiPath}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body.payload || body),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      return NextResponse.json(
        { error: errorData.message || "Request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Service PUT response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in service PUT:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const apiPath =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    if (!apiPath) {
      return NextResponse.json(
        { error: "No valid API path configured" },
        { status: 500 }
      );
    }

    // Get the endpoint from query parameters
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json(
        { error: "Endpoint parameter is required" },
        { status: 400 }
      );
    }

    const token = req.headers.get("authorization");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = token;
    }

    console.log("Service DELETE request:", `${apiPath}${endpoint}`);

    const response = await fetch(`${apiPath}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      return NextResponse.json(
        { error: errorData.message || "Request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Service DELETE response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in service DELETE:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
