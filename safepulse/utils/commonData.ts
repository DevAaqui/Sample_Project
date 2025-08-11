export type RefreshFrequency =
  | "30s"
  | "1m"
  | "5m"
  | "10m"
  | "30m"
  | "1h"
  | "manual";

export const FREQUENCY_OPTIONS: {
  key: RefreshFrequency;
  label: string;
  value: number;
}[] = [
  { key: "30s", label: "30 seconds", value: 30 },
  { key: "1m", label: "1 minute", value: 60 },
  { key: "5m", label: "5 minutes", value: 300 },
  { key: "10m", label: "10 minutes", value: 600 },
  { key: "30m", label: "30 minutes", value: 1800 },
  { key: "1h", label: "1 hour", value: 3600 },
  { key: "manual", label: "Manual", value: 0 },
];