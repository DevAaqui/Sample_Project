"use client";

import React, { useState, useEffect } from "react";
import TextNode from "./components/nodes/TextNode";
import NumberNode from "./components/nodes/NumberNode";
import LLMNode from "./components/nodes/LLMNode";
import OutputNode from "./components/nodes/OutputNode";
import TransformNode from "./components/nodes/TransformNode";
import NodePalette from "./components/NodePallette";
import DatePickerNode from "./components/nodes/DatePicker";
import CheckboxNode from "./components/nodes/CheckBox";
import SelectNode from "./components/nodes/SelectNode";

interface NodeData {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  title: string;
  [key: string]: any;
}

type NodeType = "text" | "number" | "llm" | "transform" | "output" | "custom";

const NODE_DEFAULTS: Record<NodeType, { title: string }> = {
  text: { title: "Text Input" },
  number: { title: "Number Input" },
  llm: { title: "LLM Processor" },
  transform: { title: "Text Transform" },
  output: { title: "Output" },
  custom: { title: "Custom Node" },
};

const NODE_COMPONENTS: Record<NodeType, React.FC<any>> = {
  text: TextNode,
  number: NumberNode,
  llm: LLMNode,
  transform: TransformNode,
  output: OutputNode,
  custom: TextNode, // fallback to TextNode for custom
};

const CUSTOM_NODE_COMPONENTS: Record<string, React.FC<any>> = {
  "input-text": TextNode,
  "input-number": NumberNode,
  textarea: TextNode, // or a dedicated TextAreaNode if you want
  datepicker: DatePickerNode,
  checkbox: CheckboxNode,
  select: SelectNode,
  // add more as needed
};

const INITIAL_NODES: NodeData[] = [
  {
    id: "text-1",
    type: "text",
    position: { x: 80, y: 80 },
    title: "Text Input",
  },
];

function getNextId(type: NodeType, nodes: NodeData[]): string {
  let max = 0;
  nodes.forEach((n) => {
    if (n.type === type && n.id.startsWith(type + "-")) {
      const num = parseInt(n.id.split("-")[1], 10);
      if (!isNaN(num) && num > max) max = num;
    }
  });
  return `${type}-${max + 1}`;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState<NodeData[]>(INITIAL_NODES);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddNode = (
    type: NodeType,
    customProps: Record<string, any> = {}
  ) => {
    const id = getNextId(type, nodes);
    setNodes((prev) => [
      ...prev,
      {
        id,
        type,
        position: { x: 120 + prev.length * 40, y: 120 + prev.length * 40 },
        title: customProps.title || NODE_DEFAULTS[type]?.title || "Custom Node",
        ...customProps,
      },
    ]);
  };

  const handleDrag = (id: string, position: { x: number; y: number }) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, position } : node))
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-gray-100 p-2 items-center justify-center]">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Node Generator Project
        </h1>
        <NodePalette onAddNode={handleAddNode} />
      </div>
      <div className="relative w-full min-h-[90vh] bg-white">
        {nodes.map((node) => {
          let NodeComponent = NODE_COMPONENTS[node.type] || TextNode;
          if (node.type === "custom" && node.componentType) {
            NodeComponent =
              CUSTOM_NODE_COMPONENTS[node.componentType] || TextNode;
          }
          return (
            <NodeComponent
              key={node.id}
              id={node.id}
              title={node.title}
              type={node.type}
              position={node.position}
              onDrag={handleDrag}
              className="absolute"
            />
          );
        })}
      </div>
    </>
  );
}
