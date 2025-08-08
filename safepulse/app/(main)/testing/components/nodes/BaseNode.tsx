'use client';

import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Card, Button } from '@heroui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';

export interface NodeProps {
  id: string;
  title: string;
  type: string;
  position?: { x: number; y: number };
  onDrag?: (id: string, position: { x: number; y: number }) => void;
  children?: React.ReactNode;
  className?: string;
}

const BaseNode: React.FC<NodeProps> = ({
  id,
  title,
  type,
  position = { x: 0, y: 200 },
  onDrag,
  children,
  className = '',
}) => {
  const nodeRef = useRef(null);

  const handleDrag = (_: any, data: { x: number; y: number }) => {
    console.log('On Base Node Drag', data);
    if (onDrag) {
      onDrag(id, { x: data.x, y: data.y });
    }
  };

  console.log('On Base Node');

  return (
    <Draggable
      nodeRef={nodeRef as any}
      defaultPosition={position}
      onDrag={handleDrag}
      bounds="parent"
      handle=".node-handle"
    >
      <div ref={nodeRef} className={`min-w-[260px] ${className}`}>
        <Card className="p-0 shadow-xl border border-gray-200 bg-pink">
          <div className="node-handle cursor-move flex flex-col items-center justify-center px-4 py-2 bg-gray-50 border-b border-gray-200 rounded-t-xl">
            <div className="flex items-center gap-2 justify-start w-full">
              {/* <Button
                isIconOnly
                size="sm"
                variant="light"
                className="cursor-move text-gray-400 hover:text-gray-600 mb-1"
              > */}
              <Bars3Icon className="w-5 h-5" />
              {/* </Button> */}
              <h3 className="font-semibold text-gray-800 text-base text-center">
                {title}
              </h3>
            </div>
          </div>
          <div className="node-content px-5 py-4">{children}</div>
        </Card>
      </div>
    </Draggable>
  );
};

export default BaseNode;
