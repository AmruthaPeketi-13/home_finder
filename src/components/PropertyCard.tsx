import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Heart, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: string;
  priceLabel: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  type: 'buy' | 'rent' | 'book';
  index: number;
}

export const PropertyCard = ({
  title,
  location,
  price,
  priceLabel,
  bedrooms,
  bathrooms,
  sqft,
  image,
  type,
  index,
}: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const typeColors = {
    buy: 'bg-primary text-primary-foreground',
    rent: 'bg-accent text-accent-foreground',
    book: 'bg-foreground text-background',
  };

  const typeLabels = {
    buy: 'For Sale',
    rent: 'For Rent',
    book: 'Book Now',
  };

  return (
    <motion.div
      className="card-warm overflow-hidden group cursor-pointer hover-lift"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Type Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${typeColors[type]}`}>
          {typeLabels[type]}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-all"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? 'fill-destructive text-destructive' : 'text-foreground'
            }`}
          />
        </button>

        {/* View Button */}
        <motion.button
          className="absolute bottom-4 right-4 p-3 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-display font-bold text-foreground">{price}</span>
          <span className="text-sm text-muted-foreground">{priceLabel}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          {bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{bedrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{sqft} sqft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
