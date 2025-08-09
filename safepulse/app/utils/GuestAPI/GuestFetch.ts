import { Guest } from "./guestInterface";

// export async function getGuestsData(): Promise<Guest[]> {
//   try {
//     const apiUrl =
//       process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//     const response = await fetch(`${apiUrl}/guests/metrics/latest`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Add cache control for better performance
//       next: { revalidate: 30 }, // Revalidate every 30 seconds
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.guests || [];
//   } catch (error) {
//     console.error("Error fetching guests data:", error);
//     return []; // Return empty array on error
//   }
// }
// safepulse/app/utils/GuestAPI/GuestFetch.ts
export async function getGuestsData(): Promise<Guest[]> {
  try {
    // Prepare the request parameters
    const endpoint = "/guests/metrics/latest";
    const params = {
      // Add any query parameters you need
      limit: "10",
      // Add more params as needed
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
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.guests || [];
  } catch (error) {
    console.error("Error fetching guests data:", error);
    return []; // Return empty array on error
  }
}