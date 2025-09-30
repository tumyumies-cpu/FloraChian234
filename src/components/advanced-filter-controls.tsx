
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Filter, ChevronsUpDown } from "lucide-react";
import type { BatchData } from "@/lib/data";

export type FilterState = {
  productName: string;
  farmName: string;
  batchId: string;
};

export type SortState = {
  key: keyof Pick<BatchData, 'productName' | 'farmName' | 'harvestDate' | 'batchId'>;
  order: 'asc' | 'desc';
};

interface AdvancedFilterControlsProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortState) => void;
  initialFilters: FilterState;
  initialSort: SortState;
}

export function AdvancedFilterControls({ onFilterChange, onSortChange, initialFilters, initialSort }: AdvancedFilterControlsProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortState>(initialSort);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value: string) => {
    const [key, order] = value.split('-') as [SortState['key'], SortState['order']];
    const newSort = { key, order };
    setSort(newSort);
    onSortChange(newSort);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </div>
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 border rounded-md mt-2 space-y-4 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              name="productName"
              placeholder="e.g., Organic Basil"
              value={filters.productName}
              onChange={handleFilterInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="farmName">Farm Name</Label>
            <Input
              id="farmName"
              name="farmName"
              placeholder="e.g., Verdant Valley"
              value={filters.farmName}
              onChange={handleFilterInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batchId">Batch ID</Label>
            <Input
              id="batchId"
              name="batchId"
              placeholder="e.g., HB-481516"
              value={filters.batchId}
              onChange={handleFilterInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort">Sort By</Label>
            <Select onValueChange={handleSortChange} defaultValue={`${sort.key}-${sort.order}`}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="harvestDate-desc">Harvest Date (Newest)</SelectItem>
                <SelectItem value="harvestDate-asc">Harvest Date (Oldest)</SelectItem>
                <SelectItem value="productName-asc">Product Name (A-Z)</SelectItem>
                <SelectItem value="productName-desc">Product Name (Z-A)</SelectItem>
                <SelectItem value="farmName-asc">Farm Name (A-Z)</SelectItem>
                <SelectItem value="farmName-desc">Farm Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
