"use client";

import { useState } from "react";
import {
    Button,
    Input,
    Select,
    SelectItem,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Switch,
    Checkbox,
    Radio,
    RadioGroup,
    Textarea,
    Progress,
    Spinner,
    Badge,
    Avatar,
    Divider,
    Tabs,
    Tab,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";

export default function HeroUIDemo() {
    const [selectedValue, setSelectedValue] = useState("");
    const [switchValue, setSwitchValue] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [radioValue, setRadioValue] = useState("option1");
    const [textareaValue, setTextareaValue] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className="p-6 space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    HeroUI Components Demo
                </h1>
                <p className="text-default-500">
                    Explore the beautiful components from HeroUI
                </p>
            </div>

            {/* Buttons Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Buttons</h2>
                </CardHeader>
                <CardBody className="flex flex-wrap gap-4">
                    <Button color="primary">Primary</Button>
                    <Button color="secondary">Secondary</Button>
                    <Button color="success">Success</Button>
                    <Button color="warning">Warning</Button>
                    <Button color="danger">Danger</Button>
                    <Button variant="bordered">Bordered</Button>
                    <Button variant="light">Light</Button>
                    <Button variant="flat">Flat</Button>
                    <Button variant="faded">Faded</Button>
                    <Button variant="shadow">Shadow</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button isLoading>Loading</Button>
                </CardBody>
            </Card>

            {/* Inputs Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Inputs</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="text"
                            label="Text Input"
                            placeholder="Enter text here"
                            description="This is a description"
                        />
                        <Input
                            type="email"
                            label="Email Input"
                            placeholder="Enter email"
                            isInvalid
                            errorMessage="Please enter a valid email"
                        />
                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter password"
                        />
                        <Input
                            type="number"
                            label="Number Input"
                            placeholder="Enter number"
                        />
                    </div>
                    <Textarea
                        label="Textarea"
                        placeholder="Enter your message"
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                    />
                </CardBody>
            </Card>

            {/* Select Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Select</h2>
                </CardHeader>
                <CardBody>
                    <Select
                        label="Select an option"
                        placeholder="Choose an option"
                        selectedKeys={selectedValue ? [selectedValue] : []}
                        onSelectionChange={(keys) => setSelectedValue(Array.from(keys)[0] as string)}
                        className="max-w-xs"
                    >
                        <SelectItem key="option1">
                            Option 1
                        </SelectItem>
                        <SelectItem key="option2">
                            Option 2
                        </SelectItem>
                        <SelectItem key="option3">
                            Option 3
                        </SelectItem>
                    </Select>
                </CardBody>
            </Card>

            {/* Form Controls Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Form Controls</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Switch
                            isSelected={switchValue}
                            onValueChange={setSwitchValue}
                        />
                        <span>Switch: {switchValue ? "On" : "Off"}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Checkbox
                            isSelected={checkboxValue}
                            onValueChange={setCheckboxValue}
                        />
                        <span>Checkbox: {checkboxValue ? "Checked" : "Unchecked"}</span>
                    </div>

                    <RadioGroup
                        label="Radio Group"
                        value={radioValue}
                        onValueChange={setRadioValue}
                    >
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                        <Radio value="option3">Option 3</Radio>
                    </RadioGroup>
                </CardBody>
            </Card>

            {/* Progress and Loading Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Progress & Loading</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                    <Progress
                        aria-label="Loading..."
                        size="sm"
                        value={70}
                        className="max-w-md"
                    />
                    <div className="flex gap-4">
                        <Spinner size="sm" />
                        <Spinner size="md" />
                        <Spinner size="lg" />
                    </div>
                </CardBody>
            </Card>

            {/* Chips and Badges Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Chips & Badges</h2>
                </CardHeader>
                <CardBody className="flex flex-wrap gap-4">
                    <Chip color="primary">Primary</Chip>
                    <Chip color="secondary">Secondary</Chip>
                    <Chip color="success">Success</Chip>
                    <Chip color="warning">Warning</Chip>
                    <Chip color="danger">Danger</Chip>
                    <Badge content="5" color="danger">
                        <Avatar name="User" />
                    </Badge>
                </CardBody>
            </Card>

            {/* Tabs Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Tabs</h2>
                </CardHeader>
                <CardBody>
                    <Tabs aria-label="Options">
                        <Tab key="photos" title="Photos">
                            <Card>
                                <CardBody>
                                    <p>Photos content goes here</p>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="music" title="Music">
                            <Card>
                                <CardBody>
                                    <p>Music content goes here</p>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="videos" title="Videos">
                            <Card>
                                <CardBody>
                                    <p>Videos content goes here</p>
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>

            {/* Modal Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Modal</h2>
                </CardHeader>
                <CardBody>
                    <Button onPress={onOpen} color="primary">
                        Open Modal
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        Modal Title
                                    </ModalHeader>
                                    <ModalBody>
                                        <p>
                                            This is a modal example. You can put any content here.
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Action
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </CardBody>
            </Card>

            <Divider />

            <div className="text-center">
                <p className="text-default-500">
                    These are just some of the components available in HeroUI.
                    Check out the{" "}
                    <a
                        href="https://www.heroui.com/docs/components"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                    >
                        official documentation
                    </a>{" "}
                    for more components and examples.
                </p>
            </div>
        </div>
    );
} 