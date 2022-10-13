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
      <label className="flex items-center gap-2">
        {Story()}
        <Text size="sm">Remember of me for 30 days</Text>
      </label>
    ),
  ],
} as Meta;

export const Default: StoryObj = {};
