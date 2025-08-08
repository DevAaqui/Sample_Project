'use client';

import React, { useState } from 'react';
import BaseNode, { NodeProps } from './BaseNode';
import { Card, Input } from '@heroui/react';

interface NumberNodeProps extends Omit<NodeProps, 'type'> {
  value?: number;
  onChange?: (value: number) => void;
}

const NumberNode: React.FC<NumberNodeProps> = ({
  value = 0,
  onChange,
  ...props
}) => {
  const [number, setNumber] = useState(0);
  return (
    <BaseNode type="Number Input" {...props}>
      <Card className="p-0">
        <Input
          type="number"
          value={number.toString()}
          onChange={(e) => setNumber(Number(e.target.value))}
          placeholder="Enter number..."
        />
      </Card>
    </BaseNode>
  );
};

export default NumberNode;
