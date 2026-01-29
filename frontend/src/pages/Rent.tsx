import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { RentFilters } from '@/components/filters/RentFilters';
import { Home, Users, Building, Wallet, Loader2 } from 'lucide-react';
import { getProperties, type Property } from '@/lib/propertyService';
import { toast } from 'sonner';

const RentPage = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const allProperties = await getProperties();
        // Filter only rent properties
        const rentProperties = allProperties.filter(p => p.type === 'rent');
        setProperties(rentProperties);
      } catch (error: any) {
        console.error('Failed to fetch properties:', error);
        toast.error('Failed to load properties', {
          description: error.message || 'Please try again later',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading properties...</span>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <Home className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Properties Found</h3>
            <p className="text-muted-foreground">No rental properties are currently available. Check back later!</p>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {properties.map((property, index) => (
              <PropertyCard
                key={property._id}
                id={property._id}
                title={property.title}
                location={property.location}
                price={`₹${property.price.toLocaleString()}`}
                priceLabel="/month"
                type={property.type}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default RentPage;