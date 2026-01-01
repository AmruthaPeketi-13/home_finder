import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { PropertyCard } from '@/components/PropertyCard';
import { RentFilters } from '@/components/filters/RentFilters';
import { Home, Users, Building, Wallet } from 'lucide-react';

import property2 from '@/assets/property-2.jpg';
import property4 from '@/assets/property-4.jpg';
import property6 from '@/assets/property-6.jpg';

const rentProperties = [
  { id: 1, title: 'Family Home with Garden', location: 'Koramangala, Bangalore', price: '₹45,000', priceLabel: '/month', bedrooms: 4, bathrooms: 3, sqft: 2200, image: property2, type: 'rent' as const },
  { id: 2, title: 'Cozy Studio Apartment', location: 'Andheri East, Mumbai', price: '₹18,000', priceLabel: '/month', bedrooms: 1, bathrooms: 1, sqft: 550, image: property4, type: 'rent' as const },
  { id: 3, title: 'Modern Office Space', location: 'Cyber City, Gurgaon', price: '₹2.8L', priceLabel: '/month', bedrooms: 0, bathrooms: 4, sqft: 5000, image: property6, type: 'rent' as const },
];

const RentPage = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-elevated p-6 md:p-8 border-l-4 border-l-accent">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-accent/20">
                <Home className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Rent Property</h1>
                <p className="text-muted-foreground">Find the perfect rental for your needs</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3"><Building className="w-5 h-5 text-accent" /><div><p className="text-xl font-bold text-foreground">800+</p><p className="text-xs text-muted-foreground">Rentals</p></div></div>
              <div className="flex items-center gap-3"><Users className="w-5 h-5 text-accent" /><div><p className="text-xl font-bold text-foreground">Sharing</p><p className="text-xs text-muted-foreground">Available</p></div></div>
              <div className="flex items-center gap-3"><Wallet className="w-5 h-5 text-accent" /><div><p className="text-xl font-bold text-foreground">Flexible</p><p className="text-xs text-muted-foreground">Budgets</p></div></div>
            </div>
          </div>
        </motion.div>
        <RentFilters filters={filters} onFilterChange={setFilters} />
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {rentProperties.map((property, index) => (<PropertyCard key={property.id} {...property} index={index} />))}
        </motion.div>
      </main>
    </div>
  );
};

export default RentPage;