import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, CalendarDays, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BookFiltersProps {
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
}

const locations = ['All Locations', 'Mumbai', 'Goa', 'Bangalore', 'Chennai', 'Hyderabad', 'Jaipur', 'Udaipur', 'Manali', 'Shimla'];
const budgets = ['Any Budget', '₹1K - 3K/night', '₹3K - 6K/night', '₹6K - 10K/night', '₹10K - 20K/night', '₹20K+/night'];
const guestOptions = ['Any', '1-2 Guests', '3-4 Guests', '5-6 Guests', '7-10 Guests', '10+ Guests'];

export const BookFilters = ({ filters, onFilterChange }: BookFiltersProps) => {
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
          Booking Filters
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
          placeholder="Search vacation stays..."
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
            Destination
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
            Budget/Night
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

        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            Check-in
          </label>
          <input
            type="date"
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none text-sm"
            value={filters.checkIn || ''}
            onChange={(e) => onFilterChange({ ...filters, checkIn: e.target.value })}
          />
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            Check-out
          </label>
          <input
            type="date"
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none text-sm"
            value={filters.checkOut || ''}
            onChange={(e) => onFilterChange({ ...filters, checkOut: e.target.value })}
          />
        </div>

        {/* No. of People */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Guests
          </label>
          <select
            className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary outline-none text-sm"
            value={filters.guests || ''}
            onChange={(e) => onFilterChange({ ...filters, guests: e.target.value })}
          >
            {guestOptions.map((g) => (
              <option key={g} value={g === 'Any' ? '' : g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button className="h-10 px-6 btn-gradient-primary">
          <Search className="w-4 h-4 mr-2" />
          Search Stays
        </Button>
      </div>
    </motion.div>
  );
};

export default BookFilters;
