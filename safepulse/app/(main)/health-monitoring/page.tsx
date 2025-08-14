import HealthMonitoringClient from "./component/HealthMonitoringClient";
import { getHealthData } from "@/app/utils/GuestAPI/HealthFetch";

export default async function HealthMonitoringPage() {
  const healthData = await getHealthData();
  console.log("healthData>>>>", healthData);
  return (
    <HealthMonitoringClient
      initialGuestsHealthData={healthData?.guests}
      initialPaginationHealthData={healthData?.pagination}
    />
  );
}