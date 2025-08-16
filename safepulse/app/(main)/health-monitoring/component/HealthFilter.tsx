"use client";

import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { timeRangeOptions, healthStatusOptions } from "./commonHealthFunc";

interface HealthFiltersProps {
  searchQuery: string;
  selectedTimeRange: string;
  selectedHealthStatus: string;
  onSearchChange: (query: string) => void;
  onTimeRangeChange: (range: string) => void;
  onHealthStatusChange: (status: string) => void;
  onFilterClick: () => void;
}

export default function HealthFilters({
  searchQuery,
  selectedTimeRange,
  selectedHealthStatus,
  onSearchChange,
  onTimeRangeChange,
  onHealthStatusChange,
  onFilterClick,
}: HealthFiltersProps) {
  return (
    <Card className="w-full">
      <CardBody className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              aria-label="Search guests"
              type="text"
              placeholder="Search guests..."
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              className="w-full"
              size="sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <Select
            aria-label="Select time range"
            selectedKeys={[selectedTimeRange]}
            onSelectionChange={(keys) =>
              onTimeRangeChange(Array.from(keys)[0] as string)
            }
            size="sm"
            className="min-w-[140px]"
          >
            {timeRangeOptions.map((option) => (
              <SelectItem key={option.key} textValue={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            aria-label="Select health status"
            selectedKeys={[selectedHealthStatus]}
            onSelectionChange={(keys) =>
              onHealthStatusChange(Array.from(keys)[0] as string)
            }
            size="sm"
            className="min-w-[140px]"
          >
            {healthStatusOptions.map((option) => (
              <SelectItem key={option.key} textValue={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Button
            size="sm"
            variant="bordered"
            startContent={<FunnelIcon className="h-5 w-5" />}
            className="px-4"
            onClick={onFilterClick}
          >
            Filter
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
