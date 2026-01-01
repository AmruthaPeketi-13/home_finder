import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Home as HomeIcon, CalendarDays, TrendingUp, MapPin, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { PropertyCard } from '@/components/PropertyCard';
import { BuyFilters } from '@/components/filters/BuyFilters';
import { RentFilters } from '@/components/filters/RentFilters';
import { BookFilters } from '@/components/filters/BookFilters';

import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import property4 from '@/assets/property-4.jpg';
import property5 from '@/assets/property-5.jpg';
import property6 from '@/assets/property-6.jpg';

const properties = [
  {
    id: 1,
    title: 'Luxury Apartment with City View',
    location: 'Bandra West, Mumbai',
    price: '₹1.2 Cr',
    priceLabel: 'onwards',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1450,
    image: property1,
    type: 'buy' as const,
  },
  {
    id: 2,
    title: 'Beautiful Family Home',
    location: 'Koramangala, Bangalore',
    price: '₹45,000',
    priceLabel: '/month',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    image: property2,
    type: 'rent' as const,
  },
  {
    id: 3,
    title: 'Premium Penthouse',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹3.5 Cr',
    priceLabel: 'negotiable',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    image: property3,
    type: 'buy' as const,
  },
  {
    id: 4,
    title: 'Cozy Studio Apartment',
    location: 'Andheri East, Mumbai',
    price: '₹18,000',
    priceLabel: '/month',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 550,
    image: property4,
    type: 'rent' as const,
  },
  {
    id: 5,
    title: 'Mediterranean Villa',
    location: 'ECR, Chennai',
    price: '₹8,500',
    priceLabel: '/night',
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4500,
    image: property5,
    type: 'book' as const,
  },
  {
    id: 6,
    title: 'Modern Office Space',
    location: 'Cyber City, Gurgaon',
    price: '₹2.8L',
    priceLabel: '/month',
    bedrooms: 0,
    bathrooms: 4,
    sqft: 5000,
    image: property6,
    type: 'rent' as const,
  },
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'book'>('buy');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'buy' as const, label: 'Buy', icon: Building },
    { id: 'rent' as const, label: 'Rent', icon: HomeIcon },
    { id: 'book' as const, label: 'Book', icon: CalendarDays },
  ];

  const filteredProperties = properties.filter((property) => property.type === activeTab);

  const handleTabChange = (tab: typeof activeTab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setFilters({});
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative bg-gradient-to-br from-primary/10 via-secondary to-accent/10 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-2xl">
              <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Discover Your Dream Home</span>
              </motion.div>

              <motion.h1
                className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Find the Perfect Place
                <span className="text-gradient-warm"> to Call Home</span>
              </motion.h1>

              <motion.p
                className="text-muted-foreground text-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Explore thousands of properties across India. Buy, rent, or book your next dream space.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="flex flex-wrap gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">2,500+</p>
                    <p className="text-sm text-muted-foreground">Properties</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">150+</p>
                    <p className="text-sm text-muted-foreground">Cities</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">10K+</p>
                    <p className="text-sm text-muted-foreground">Happy Users</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Browse Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-foreground">Browse Properties</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">Near you</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <AnimatePresence mode="wait">
            {activeTab === 'buy' && (
              <motion.div
                key="buy-filters"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <BuyFilters filters={filters} onFilterChange={setFilters} />
              </motion.div>
            )}
            {activeTab === 'rent' && (
              <motion.div
                key="rent-filters"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <RentFilters filters={filters} onFilterChange={setFilters} />
              </motion.div>
            )}
            {activeTab === 'book' && (
              <motion.div
                key="book-filters"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <BookFilters filters={filters} onFilterChange={setFilters} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Properties Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} {...property} index={index} />
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProperties.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="card-warm inline-block p-8">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">No properties found</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            </motion.div>
          )}

          {/* Load More */}
          {!isLoading && filteredProperties.length > 0 && (
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button className="flex items-center gap-2 px-8 py-4 bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-all rounded-xl">
                Load More Properties
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default HomePage;
