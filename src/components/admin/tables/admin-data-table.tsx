"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminDataTableProps } from "@/types";
import { 
  ChevronUp, 
  ChevronDown, 
  MoreHorizontal, 
  Download,
  Filter,
  Search
} from "lucide-react";

export function AdminDataTable<T extends Record<string, unknown>>({ 
  data, 
  columns, 
  actions = [], 
  filters = [], 
  sorting, 
  pagination, 
  bulkActions = [], 
  exportOptions = [] 
}: AdminDataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState(sorting);

  // Filter data based on search and filters
  const filteredData = data.filter(row => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchLower)
      );
      if (!matchesSearch) return false;
    }

    // Column filters
    for (const [key, value] of Object.entries(filterValues)) {
      if (value && String(row[key]).toLowerCase() !== value.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  // Sort data
  const sortedData = sortConfig 
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue === bValue) return 0;
        
        const comparison = aValue > bValue ? 1 : -1;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      })
    : filteredData;

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? [...sortedData] : []);
  };

  const handleSelectRow = (row: T, checked: boolean) => {
    setSelectedRows(prev => 
      checked 
        ? [...prev, row]
        : prev.filter(selectedRow => selectedRow !== row)
    );
  };

  const isRowSelected = (row: T) => selectedRows.includes(row);
  const allSelected = sortedData.length > 0 && selectedRows.length === sortedData.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < sortedData.length;

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {/* Filters */}
          {filters.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {Object.keys(filterValues).length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {Object.keys(filterValues).length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="p-2 space-y-2">
                  {filters.map(filter => (
                    <div key={filter.key}>
                      <label className="text-sm font-medium">{filter.label}</label>
                      {filter.type === 'select' ? (
                        <select
                          value={filterValues[filter.key] || ''}
                          onChange={(e) => setFilterValues(prev => ({
                            ...prev,
                            [filter.key]: e.target.value
                          }))}
                          className="w-full mt-1 p-1 border rounded"
                        >
                          <option value="">All</option>
                          {filter.options?.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          value={filterValues[filter.key] || ''}
                          onChange={(e) => setFilterValues(prev => ({
                            ...prev,
                            [filter.key]: e.target.value
                          }))}
                          className="mt-1"
                          placeholder={`Filter by ${filter.label}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Bulk Actions */}
          {selectedRows.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedRows.length} selected
              </span>
              {bulkActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "outline"}
                  size="sm"
                  onClick={() => action.onClick(selectedRows)}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          {/* Export Options */}
          {exportOptions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {exportOptions.map((option, index) => (
                  <DropdownMenuItem 
                    key={index} 
                    onClick={option.onClick}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {(bulkActions.length > 0 || actions.length > 0) && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}
              {columns.map(column => (
                <TableHead 
                  key={String(column.key)}
                  className={column.sortable ? "cursor-pointer hover:bg-gray-50" : ""}
                  onClick={column.sortable ? () => handleSort(String(column.key)) : undefined}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={`h-3 w-3 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-blue-600' 
                              : 'text-gray-400'
                          }`} 
                        />
                        <ChevronDown 
                          className={`h-3 w-3 -mt-1 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-blue-600' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
              {actions.length > 0 && (
                <TableHead className="w-12">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (bulkActions.length > 0 ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                  className="text-center py-8 text-gray-500"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-gray-50">
                  {(bulkActions.length > 0 || actions.length > 0) && (
                    <TableCell>
                      <Checkbox
                        checked={isRowSelected(row)}
                        onCheckedChange={(checked) => handleSelectRow(row, !!checked)}
                      />
                    </TableCell>
                  )}
                  {columns.map(column => (
                    <TableCell key={String(column.key)}>
                      {column.render 
                        ? column.render(row[column.key], row)
                        : String(row[column.key])
                      }
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {actions.map((action, actionIndex) => (
                            <DropdownMenuItem
                              key={actionIndex}
                              onClick={() => action.onClick(row)}
                              className="cursor-pointer"
                            >
                              {action.icon}
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {((pagination.page - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
