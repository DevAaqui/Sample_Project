// safepulse/app/utils/GuestAPI/GuestFetch.ts
import { Guest, PaginationInfo } from "./guestInterface";

export async function getHealthData(page: number = 1): Promise<{
  guests: Guest[];
  pagination: PaginationInfo;
}> {
  try {
    // Prepare the request parameters - fetch 100 guests per request
    const endpoint = "/guests/health/latest";
    const params = {
      page: page.toString(),
      limit: "50", // Fetch 100 guests per backend request
    };

    // Prepare custom headers if needed
    const headers = {
      // Add any custom headers
    };

    // Construct the URL with all parameters
    const url = new URL("/api/service", "http://localhost:3000");
    url.searchParams.set("endpoint", endpoint);
    url.searchParams.set("params", JSON.stringify(params));
    url.searchParams.set("headers", JSON.stringify(headers));

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // "Authorization": `Bearer ${token}`,
      },
      // next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      guests: data.guests || [],
      pagination: data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 100,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
      },
    };
  } catch (error) {
    console.error("Error fetching guests data:", error);
    return {
      guests: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 100,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
      },
    };
  }
}
