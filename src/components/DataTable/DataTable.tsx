import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  // ✅ State for selected rows
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
    new Set()
  );

  // ✅ State for sorting
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // ✅ Handle row selection
  const handleSelectRow = (id: string | number) => {
    setSelectedRowIds((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }

      // 🔄 Callback with selected rows
      if (onRowSelect) {
        const selectedRows = data.filter((row) => newSelection.has(row.id));
        onRowSelect(selectedRows);
      }

      return newSelection;
    });
  };

  // ✅ Handle sorting
  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const isAsc = sortColumn === col.dataIndex ? !sortAsc : true;
    setSortColumn(col.dataIndex);
    setSortAsc(isAsc);
  };

  // ✅ Sort data
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  // ✅ Loading & Empty states
  if (loading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }
  if (data.length === 0) {
    return <div className="p-4 text-gray-500">No data available</div>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            {selectable && <th className="p-2 text-left">Select</th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`p-2 text-left font-semibold ${
                  col.sortable ? "cursor-pointer select-none" : ""
                }`}
                onClick={() => handleSort(col)}
              >
                {col.title}{" "}
                {sortColumn === col.dataIndex
                  ? sortAsc
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              {selectable && (
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRowIds.has(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    aria-label={`Select row ${row.id}`} // ✅ accessibility
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
