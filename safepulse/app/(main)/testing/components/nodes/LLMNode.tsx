"use client";

import React from "react";
import BaseNode, { NodeProps } from "./BaseNode";
import { Card, Select, Input, SelectItem } from "@heroui/react";

interface LLMNodeProps extends Omit<NodeProps, "type"> {
  model?: string;
  temperature?: number;
  onModelChange?: (model: string) => void;
  onTemperatureChange?: (temp: number) => void;
}

const LLMNode: React.FC<LLMNodeProps> = ({
  model = "gpt-3.5-turbo",
  temperature = 0.7,
  onModelChange,
  onTemperatureChange,
  ...props
}) => {
  return (
    <BaseNode type="LLM" {...props}>
      <Card className="space-y-3 p-4">
        <Select
          label="Model"
          value={model}
          onChange={(e) => onModelChange?.(e.target.value)}
        >
          <SelectItem key="gpt-3.5-turbo">
            GPT-3.5 Turbo
          </SelectItem>
          <SelectItem key="gpt-4">
            GPT-4
          </SelectItem>
          <SelectItem key="claude-3-5-sonnet">
            Claude 3.5 Sonnet
          </SelectItem>
          {/* <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="claude-2">Claude 2</option> */}
        </Select>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Temperature:</label>
          <Input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={temperature.toString()}
            onChange={(e) => onTemperatureChange?.(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600">{temperature}</span>
        </div>
      </Card>
    </BaseNode>
  );
};

export default LLMNode;
