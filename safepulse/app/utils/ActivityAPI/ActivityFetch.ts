export async function getActivityCardsData(): Promise<{}> {
  try {
    // Prepare the request parameters - fetch 100 guests per request
    const endpoint = "/activity-tracking/dashboard";
    const params = {
      // page: page.toString(),
      // limit: "50", // Fetch 100 guests per backend request
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
      data: data.data || [],
    };
  } catch (error) {
    console.error("Error fetching activity cards data:", error);
    return {
      data: [],
    };
  }
}
