import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import { Input, Select, Button, Group, NumberInput } from "@mantine/core";
import {
  IconArrowsUpDown,
  IconChevronLeft,
  IconChevronRight,
  IconMail,
  IconPhone,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";

const columnHelper = createColumnHelper<any>();

const mockData = [
  { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "123-456-7890" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com", phone: "987-654-3210" },
  { id: 3, name: "Michael Johnson", email: "michaeljohnson@example.com", phone: "555-123-4567" },
  { id: 4, name: "Emily Wilson", email: "emilywilson@example.com", phone: "999-888-7777" },
  { id: 5, name: "Daniel Lee", email: "daniellee@example.com", phone: "444-555-6666" },
  { id: 6, name: "Olivia Martinez", email: "oliviamartinez@example.com", phone: "777-999-1111" },
  { id: 7, name: "William Thompson", email: "williamthompson@example.com", phone: "222-333-4444" },
];

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <IconUser className="mr-2" size={16} /> ID
      </span>
    ),
  }),

  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <IconUser className="mr-2" size={16} /> Name
      </span>
    ),
  }),

  columnHelper.accessor("email", {
    id: "email",
    cell: (info) => <span className="italic text-blue-600">{info.getValue()}</span>,
    header: () => (
      <span className="flex items-center">
        <IconMail className="mr-2" size={16} /> Email
      </span>
    ),
  }),

  columnHelper.accessor("phone", {
    header: () => (
      <span className="flex items-center">
        <IconPhone className="mr-2" size={16} /> Phone
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
];

const TableComponent = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    // onPaginationChange: ({ pageIndex, pageSize }) => {
    //   table.setPageIndex(pageIndex);
    //   table.setPageSize(pageSize);
    // },
  });

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="mb-4 relative">
        <Input
          leftSection={<IconSearch size={20} />}
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <IconArrowsUpDown className="ml-2" size={14} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
        {/* Page size selection */}
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="mr-2">Items per page</span>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onChange={(value) => {
              const newSize = Number(value);
              table.setPageSize(newSize);
            }}
            data={[1, 5, 10, 20, 30].map(String)}
            className="w-32"
          />
        </div>

        {/* Pagination buttons */}
        <Group gap={4}>
          <Button
            variant="outline"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            <IconChevronLeft size={20} />
          </Button>

          <Button
            variant="outline"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <IconChevronLeft size={20} />
          </Button>

          <span>
            <NumberInput
              min={1}
              max={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e ? Number(e) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 p-2 rounded-md border border-gray-300 text-center"
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span>

          <Button
            variant="outline"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <IconChevronRight size={20} />
          </Button>

          <Button
            variant="outline"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            <IconChevronRight size={20} />
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default TableComponent;
