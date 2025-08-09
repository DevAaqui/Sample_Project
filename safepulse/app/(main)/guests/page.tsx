import GuestClient from "./component/GuestClient";
import { getGuestsData } from "@/app/utils/GuestAPI/GuestFetch";

export default async function GuestsPage() {
  // Fetch initial data server-side
  const guestsInfo = await getGuestsData(1);

  return (
    <GuestClient
      initialGuests={guestsInfo.guests}
      initialPagination={guestsInfo.pagination}
    />
  );
}
