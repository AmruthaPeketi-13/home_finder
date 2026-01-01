import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { PropertyCard } from '@/components/PropertyCard';
import { BookFilters } from '@/components/filters/BookFilters';
import { CalendarDays, Users, Star, Plane } from 'lucide-react';

import property3 from '@/assets/property-3.jpg';
import property5 from '@/assets/property-5.jpg';

const bookProperties = [
  { id: 1, title: 'Premium Penthouse', location: 'Jubilee Hills, Hyderabad', price: '₹12,000', priceLabel: '/night', bedrooms: 5, bathrooms: 4, sqft: 3500, image: property3, type: 'book' as const },
  { id: 2, title: 'Mediterranean Villa', location: 'ECR, Chennai', price: '₹8,500', priceLabel: '/night', bedrooms: 6, bathrooms: 5, sqft: 4500, image: property5, type: 'book' as const },
];

const BookPage = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-elevated p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-primary/20">
                <CalendarDays className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Book Property</h1>
                <p className="text-muted-foreground">Short-term stays and vacation rentals</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3"><Plane className="w-5 h-5 text-primary" /><div><p className="text-xl font-bold text-foreground">Instant</p><p className="text-xs text-muted-foreground">Booking</p></div></div>
              <div className="flex items-center gap-3"><Users className="w-5 h-5 text-primary" /><div><p className="text-xl font-bold text-foreground">Groups</p><p className="text-xs text-muted-foreground">Welcome</p></div></div>
              <div className="flex items-center gap-3"><Star className="w-5 h-5 text-primary" /><div><p className="text-xl font-bold text-foreground">4.8★</p><p className="text-xs text-muted-foreground">Rating</p></div></div>
            </div>
          </div>
        </motion.div>
        <BookFilters filters={filters} onFilterChange={setFilters} />
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {bookProperties.map((property, index) => (<PropertyCard key={property.id} {...property} index={index} />))}
        </motion.div>
      </main>
    </div>
  );
};

export default BookPage;