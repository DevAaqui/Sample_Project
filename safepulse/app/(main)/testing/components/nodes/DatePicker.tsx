import React, { useState } from "react";
import BaseNode, { NodeProps } from "./BaseNode";
import { Card, DatePicker, DateValue } from "@heroui/react";

const DatePickerNode: React.FC<NodeProps> = (props) => {
  const [date, setDate] = useState<any | null>(null);
  return (
    <BaseNode {...props}>
      <Card className="p-0">
        <DatePicker
          value={date}
          onChange={setDate}
          // placeholder="Select date"
        />
      </Card>
    </BaseNode>
  );
};

export default DatePickerNode;