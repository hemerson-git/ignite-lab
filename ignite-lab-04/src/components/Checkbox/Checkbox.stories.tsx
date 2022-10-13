import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from ".";
import { Text } from "../Text";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {},
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="flex items-center gap-2">
        {Story()}
        <Text size="sm">Remember of me for 30 days</Text>
      </div>
    ),
  ],
} as Meta;

export const Default: StoryObj = {};
