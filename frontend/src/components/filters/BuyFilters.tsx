import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Maximize, Compass, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BuyFiltersProps {
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
}

const locations = ['All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Gurgaon', 'Pune'];
const budgets = ['Any Budget', '₹10L - 50L', '₹50L - 1Cr', '₹1Cr - 2Cr', '₹2Cr - 5Cr', '₹5Cr+'];
const sqftRanges = ['Any Size', '500-1000 sqft', '1000-1500 sqft', '1500-2000 sqft', '2000-3000 sqft', '3000+ sqft'];
const facings = ['Any Facing', 'East', 'West', 'North', 'South', 'North-East', 'South-East'];
const ages = ['Any Age', 'Under Construction', '0-1 Years', '1-5 Years', '5-10 Years', '10+ Years'];

export const BuyFilters = ({ filters, onFilterChange }: BuyFiltersProps) => {
  const hasActiveFilters = Object.values(filters).some(v => v && v !== '');

  const handleClearFilters = () => {
    onFilterChange({});
  };

  return (
    <motion.div
      className="glass-panel p-5 mb-6 border-l-4 border-l-primary"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Buy Filters
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
          placeholder="Search properties to buy..."
          className="pl-12 h-12 bg-secondary/50 border-border focus:border-primary"
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Location
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none text-sm"
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
            <DollarSign className="w-4 h-4 text-primary" />
            Budget
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none text-sm"
            value={filters.budget || ''}
            onChange={(e) => onFilterChange({ ...filters, budget: e.target.value })}
          >
            {budgets.map((b) => (
              <option key={b} value={b === 'Any Budget' ? '' : b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Sqft */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Maximize className="w-4 h-4 text-primary" />
            Sqft Area
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none text-sm"
            value={filters.sqft || ''}
            onChange={(e) => onFilterChange({ ...filters, sqft: e.target.value })}
          >
            {sqftRanges.map((s) => (
              <option key={s} value={s === 'Any Size' ? '' : s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Facing */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            Facing
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none text-sm"
            value={filters.facing || ''}
            onChange={(e) => onFilterChange({ ...filters, facing: e.target.value })}
          >
            {facings.map((f) => (
              <option key={f} value={f === 'Any Facing' ? '' : f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Property Age */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Property Age
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none text-sm"
            value={filters.age || ''}
            onChange={(e) => onFilterChange({ ...filters, age: e.target.value })}
          >
            {ages.map((a) => (
              <option key={a} value={a === 'Any Age' ? '' : a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button className="h-10 px-6 btn-gradient-primary">
          <Search className="w-4 h-4 mr-2" />
          Search Properties
        </Button>
      </div>
    </motion.div>
  );
};

export default BuyFilters;
