import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react-webpack5"; // ✅ updated
import { InputField, InputFieldProps } from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
} as Meta<typeof InputField>;

const Template: StoryFn<InputFieldProps> = (args) => {
  const [value, setValue] = useState("");
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Username",
  placeholder: "Enter your username",
  helperText: "This is a helper text",
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: "Email",
  placeholder: "Enter your email",
  invalid: true,
  errorMessage: "Invalid email address",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Password",
  placeholder: "Enter password",
  disabled: true,
};
