import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterBarProps {
  activeFilters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
}

export const FilterBar = ({ activeFilters, onFilterChange }: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const locations = ['All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];
  const budgets = ['Any Budget', '₹10L - 50L', '₹50L - 1Cr', '₹1Cr - 2Cr', '₹2Cr+'];
  const bhkOptions = ['Any BHK', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'];

  const handleClearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <motion.div
      className="glass-panel p-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search properties, locations, or features..."
            className="pl-12 h-12 bg-secondary/50 border-border focus:border-primary"
          />
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="h-12 px-6 border-border hover:bg-secondary"
        >
          Filters
          <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>

        <Button className="h-12 px-8 btn-gradient-primary">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <motion.div
          className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Location
            </label>
            <select
              className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none"
              value={activeFilters.location || ''}
              onChange={(e) => onFilterChange({ ...activeFilters, location: e.target.value })}
            >
              {locations.map((loc) => (
                <option key={loc} value={loc === 'All Locations' ? '' : loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Budget
            </label>
            <select
              className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none"
              value={activeFilters.budget || ''}
              onChange={(e) => onFilterChange({ ...activeFilters, budget: e.target.value })}
            >
              {budgets.map((budget) => (
                <option key={budget} value={budget === 'Any Budget' ? '' : budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>

          {/* BHK Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">BHK Type</label>
            <select
              className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none"
              value={activeFilters.bhk || ''}
              onChange={(e) => onFilterChange({ ...activeFilters, bhk: e.target.value })}
            >
              {bhkOptions.map((bhk) => (
                <option key={bhk} value={bhk === 'Any BHK' ? '' : bhk}>
                  {bhk}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                className="h-10 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterBar;
