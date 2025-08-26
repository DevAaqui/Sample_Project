import { getActivityCardsData } from "@/app/utils/ActivityAPI/ActivityFetch";
import ActivityTrackingClient from "./component/ActivityTrackingClient";

export default async function ActivityTrackingPage() {
  const activityCardsData = await getActivityCardsData();
  console.log("activity>>>>>>>>>>>>>>>", activityCardsData);

  return <ActivityTrackingClient />;
}
