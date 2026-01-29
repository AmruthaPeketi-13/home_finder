import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { PropertyCard } from '@/components/PropertyCard';
import { BuyFilters } from '@/components/filters/BuyFilters';
import { Building, TrendingUp, MapPin, Shield } from 'lucide-react';

import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

const buyProperties = [
  { id: 1, title: 'Luxury Apartment with City View', location: 'Bandra West, Mumbai', price: '₹1.2 Cr', priceLabel: 'onwards', bedrooms: 3, bathrooms: 2, sqft: 1450, image: property1, type: 'buy' as const },
  { id: 2, title: 'Premium Villa', location: 'Koramangala, Bangalore', price: '₹2.5 Cr', priceLabel: 'negotiable', bedrooms: 4, bathrooms: 3, sqft: 3200, image: property2, type: 'buy' as const },
  { id: 3, title: 'Penthouse Suite', location: 'Jubilee Hills, Hyderabad', price: '₹3.5 Cr', priceLabel: 'firm', bedrooms: 5, bathrooms: 4, sqft: 4500, image: property3, type: 'buy' as const },
];

const BuyPage = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-elevated p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-primary/20">
                <Building className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Buy Property</h1>
                <p className="text-muted-foreground">Find your dream home to own</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3"><TrendingUp className="w-5 h-5 text-primary" /><div><p className="text-xl font-bold text-foreground">500+</p><p className="text-xs text-muted-foreground">For Sale</p></div></div>
              <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /><div><p className="text-xl font-bold text-foreground">50+</p><p className="text-xs text-muted-foreground">Locations</p></div></div>
              <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-primary" /><div><p className="text-xl font-bold text-foreground">100%</p><p className="text-xs text-muted-foreground">Verified</p></div></div>
            </div>
          </div>
        </motion.div>
        <BuyFilters filters={filters} onFilterChange={setFilters} />
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {buyProperties.map((property, index) => (<PropertyCard key={property.id} {...property} index={index} />))}
        </motion.div>
      </main>
    </div>
  );
};

export default BuyPage;