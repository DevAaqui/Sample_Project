"use client";

import React, { useState } from "react";
import {
  Button,
  Modal,
  Input,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Select,
  SelectItem,
} from "@heroui/react";

const NODE_TYPES = [
  { type: "text", label: "Text Input" },
  { type: "number", label: "Number Input" },
  { type: "llm", label: "LLM Processor" },
  { type: "transform", label: "Text Transform" },
  { type: "output", label: "Output" },
];

const HERO_COMPONENTS = [
  { type: "input-text", label: "Input (Text)", component: "Input" },
  { type: "input-number", label: "Input (Number)", component: "Input" },
  { type: "textarea", label: "Text Area", component: "TextArea" },
  { type: "datepicker", label: "Date Picker", component: "DatePicker" },
  { type: "select", label: "Select Dropdown", component: "Select" },
  { type: "checkbox", label: "Checkbox", component: "Checkbox" },
];

export default function NodePalette({ onAddNode }: any) {
  const [customTitle, setCustomTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");

  const handleAddCustom = () => {
    if (customTitle.trim() && selectedComponent) {
      const selectedComponentData = HERO_COMPONENTS.find(
        (comp) => comp.type === selectedComponent
      );

      onAddNode("custom", {
        title: customTitle,
        componentType: selectedComponentData?.type,
        component: selectedComponentData?.component,
      });

      setCustomTitle("");
      setSelectedComponent("");
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* {NODE_TYPES.map((node) => (
          <Button
            key={node.type}
            color="primary"
            variant="flat"
            size="md"
            onClick={() => onAddNode(node.type)}
            className="border border-gray-300 rounded-md"
          >
            {node.label}
          </Button>
        ))} */}
        <Button
          color="secondary"
          variant="flat"
          size="md"
          onClick={() => setShowModal(true)}
        >
          + Node Generator
        </Button>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        portalContainer={document.body}
      >
        <ModalContent>
          <ModalHeader>Add Custom Node</ModalHeader>
          <ModalBody className="space-y-4">
            <Input
              label="Node Title"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Enter node title"
            />
            <Select
              label="Select Component Type"
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
              placeholder="Choose a component"
            >
              {HERO_COMPONENTS.map((component: any) => (
                <SelectItem key={component.type}>{component.label}</SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={handleAddCustom}
              isDisabled={!customTitle.trim() || !selectedComponent}
            >
              Add
            </Button>
            <Button color="secondary" onPress={() => setShowModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
