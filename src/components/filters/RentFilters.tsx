import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Home, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RentFiltersProps {
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
}

const locations = ['All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Gurgaon', 'Pune'];
const budgets = ['Any Budget', '₹5K - 15K', '₹15K - 30K', '₹30K - 50K', '₹50K - 1L', '₹1L+'];
const bhkOptions = ['Any BHK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
const sharingOptions = ['Any Type', 'Single Room', 'Sharing (2)', 'Sharing (3)', 'Sharing (4+)', 'Full Flat'];

export const RentFilters = ({ filters, onFilterChange }: RentFiltersProps) => {
  const hasActiveFilters = Object.values(filters).some(v => v && v !== '');

  const handleClearFilters = () => {
    onFilterChange({});
  };

  return (
    <motion.div
      className="glass-panel p-5 mb-6 border-l-4 border-l-accent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Rent Filters
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4 mr-1" /> Clear
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search rentals..."
          className="pl-12 h-12 bg-secondary/50 border-border focus:border-accent"
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            Location
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none text-sm"
            value={filters.location || ''}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc === 'All Locations' ? '' : loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-accent" />
            Monthly Budget
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none text-sm"
            value={filters.budget || ''}
            onChange={(e) => onFilterChange({ ...filters, budget: e.target.value })}
          >
            {budgets.map((b) => (
              <option key={b} value={b === 'Any Budget' ? '' : b}>{b}</option>
            ))}
          </select>
        </div>

        {/* BHK */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Home className="w-4 h-4 text-accent" />
            BHK Type
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none text-sm"
            value={filters.bhk || ''}
            onChange={(e) => onFilterChange({ ...filters, bhk: e.target.value })}
          >
            {bhkOptions.map((bhk) => (
              <option key={bhk} value={bhk === 'Any BHK' ? '' : bhk}>{bhk}</option>
            ))}
          </select>
        </div>

        {/* Sharing */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Sharing Type
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-accent outline-none text-sm"
            value={filters.sharing || ''}
            onChange={(e) => onFilterChange({ ...filters, sharing: e.target.value })}
          >
            {sharingOptions.map((s) => (
              <option key={s} value={s === 'Any Type' ? '' : s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button className="h-10 px-6 btn-gradient-accent">
          <Search className="w-4 h-4 mr-2" />
          Find Rentals
        </Button>
      </div>
    </motion.div>
  );
};

export default RentFilters;
