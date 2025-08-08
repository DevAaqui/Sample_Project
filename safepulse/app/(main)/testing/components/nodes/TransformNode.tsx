"use client";

import React from "react";
import BaseNode, { NodeProps } from "./BaseNode";
import { Card, Select, SelectItem } from "@heroui/react";

interface TransformNodeProps extends Omit<NodeProps, "type"> {
  operation?: string;
  onOperationChange?: (op: string) => void;
}

const TransformNode: React.FC<TransformNodeProps> = ({
  operation = "uppercase",
  onOperationChange,
  ...props
}) => {
  return (
    <BaseNode type="Transform" {...props}>
      <Card className="p-4">
        <Select
          label="Operation"
          value={operation}
          onChange={(e) => onOperationChange?.(e.target.value)}
        >
          <SelectItem key="uppercase">Uppercase</SelectItem>
          <SelectItem key="lowercase">Lowercase</SelectItem>
          <SelectItem key="capitalize">Capitalize</SelectItem>
          <SelectItem key="reverse">Reverse</SelectItem>
          <SelectItem key="trim">Trim</SelectItem>
        </Select>
      </Card>
    </BaseNode>
  );
};

export default TransformNode;
