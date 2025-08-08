'use client';

import React from 'react';
import BaseNode, { NodeProps } from './BaseNode';
import { Card } from '@heroui/react';

interface OutputNodeProps extends Omit<NodeProps, 'type'> {
    value?: string;
}

const OutputNode: React.FC<OutputNodeProps> = ({ value = '', ...props }) => {
    return (
        <BaseNode type="Output" {...props}>
            <Card className="p-4 bg-gray-50 min-h-[60px]">
                {value || 'No output yet...'}
            </Card>
        </BaseNode>
    );
};

export default OutputNode; 