import { getGuestsData } from "@/app/utils/GuestAPI/GuestFetch";
import GuestClient from "./component/GuestClient";

export default async function GuestsPage() {
  const guests = await getGuestsData();
  return <GuestClient guestsData={guests} />;
}