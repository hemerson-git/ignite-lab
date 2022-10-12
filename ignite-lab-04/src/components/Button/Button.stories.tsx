import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from ".";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Create Account",
  },

  argTypes: {},
} as Meta<ButtonProps>;

export const Default: StoryObj<ButtonProps> = {};

export const Small: StoryObj<ButtonProps> = {
  args: {},
};

export const Large: StoryObj<ButtonProps> = {
  args: {},
};

export const CustomText: StoryObj<ButtonProps> = {
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
