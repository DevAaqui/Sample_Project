'use client';
import React, { useState } from 'react';
import BaseNode, { NodeProps } from './BaseNode';
import { Card, Checkbox } from '@heroui/react';

const CheckboxNode: React.FC<NodeProps> = (props) => {
  const [checked, setChecked] = useState(false);
  return (
    <BaseNode {...props}>
      <Card className="p-0 flex items-center">
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        >
          Check me!
        </Checkbox>
      </Card>
    </BaseNode>
  );
};

export default CheckboxNode;
