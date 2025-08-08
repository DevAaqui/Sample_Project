"use client";

import React, { useState } from "react";
import BaseNode, { NodeProps } from "./BaseNode";
import { Card, Textarea } from "@heroui/react";

interface TextNodeProps extends Omit<NodeProps, "type"> {
  value?: string;
  onChange?: (value: string) => void;
}

const TextNode: React.FC<TextNodeProps> = ({
  value = "",
  onChange,
  ...props
}) => {
  const [text, setText] = useState(value);
  return (
    <BaseNode type="Text Input" {...props}>
      <Card className="p-0">
        <Textarea
          disableAnimation
          disableAutosize
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            // onChange?.(e.target.value);
          }}
          classNames={{
            base: "max-w-xs",
            input: "resize-y min-h-[40px]",
          }}
          placeholder="Enter text..."
          variant="bordered"
        />
      </Card>
    </BaseNode>
  );
};

export default TextNode;
