import React from "react";
import { Meta, StoryFn } from "@storybook/react-webpack5"; // ✅ updated import
import { DataTable, DataTableProps, Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

export default {
  title: "Components/DataTable",
  component: DataTable,
} as Meta<typeof DataTable>;

const users: User[] = [
  { id: 1, name: "Angel", email: "angel@example.com" },
  { id: 2, name: "John", email: "john@example.com" },
];

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const Template: StoryFn<DataTableProps<User>> = (args) => <DataTable {...args} />;

export const Default = Template.bind({});
Default.args = { data: users, columns, selectable: true };

export const Loading = Template.bind({});
Loading.args = { data: [], columns, loading: true };

export const Empty = Template.bind({});
Empty.args = { data: [], columns };
