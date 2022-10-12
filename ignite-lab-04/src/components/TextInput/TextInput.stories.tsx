import { Meta, StoryObj } from "@storybook/react";
import { TextInput, TextInputProps } from ".";

export default {
  title: "Components/TextInput",
  component: TextInput,
  args: {
    children: "Create Account",
  },

  argTypes: {},
} as Meta<TextInputProps>;

export const Default: StoryObj<TextInputProps> = {};

export const Small: StoryObj<TextInputProps> = {
  args: {},
};

export const Large: StoryObj<TextInputProps> = {
  args: {},
};

export const CustomText: StoryObj<TextInputProps> = {
  args: {
    asChild: true,
    children: <h1>Heading with H1</h1>,
  },

  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },

    asChild: {
      table: {
        disable: true,
      },
    },
  },
};
