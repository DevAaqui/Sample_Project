'use client';
import React, { useState } from 'react';
import BaseNode, { NodeProps } from './BaseNode';
import { Card, Select, SelectItem } from '@heroui/react';

const SelectNode: React.FC<NodeProps> = (props) => {
  const [value, setValue] = useState('');
  return (
    <BaseNode {...props}>
      <Card className="p-0">
        <Select
          label="Choose an option"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <SelectItem key="option1">Option 1</SelectItem>
          <SelectItem key="option2">Option 2</SelectItem>
          <SelectItem key="option3">Option 3</SelectItem>
        </Select>
      </Card>
    </BaseNode>
  );
};

export default SelectNode;
