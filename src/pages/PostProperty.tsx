import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, MapPin, Upload, Building, Camera, Check } from 'lucide-react';
import { toast } from 'sonner';

const PostProperty = () => {
  const [propertyType, setPropertyType] = useState<'buy' | 'rent' | 'book'>('rent');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    description: '',
    facing: '',
    age: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Property submitted for review!', {
      description: 'We will verify your listing and make it live soon.',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const typeOptions = [
    { id: 'buy' as const, label: 'For Sale', description: 'Sell your property' },
    { id: 'rent' as const, label: 'For Rent', description: 'Monthly rental' },
    { id: 'book' as const, label: 'For Booking', description: 'Short-term stays' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary/20 glow-primary">
              <PlusCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Post Your Property</h1>
          <p className="text-muted-foreground">List your property and reach thousands of potential buyers/tenants</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Property Type */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">Property Type</h2>
            <div className="grid grid-cols-3 gap-4">
              {typeOptions.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setPropertyType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    propertyType === type.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-secondary/30 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{type.label}</span>
                    {propertyType === type.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{type.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Beautiful 3BHK Apartment"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="h-12 bg-secondary/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter property location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="pl-12 h-12 bg-secondary/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder={propertyType === 'buy' ? 'Total price' : 'Per month/night'}
                    value={formData.price}
                    onChange={handleInputChange}
                    className="h-12 bg-secondary/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sqft">Area (sq.ft)</Label>
                  <Input
                    id="sqft"
                    name="sqft"
                    type="number"
                    placeholder="Total area"
                    value={formData.sqft}
                    onChange={handleInputChange}
                    className="h-12 bg-secondary/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary outline-none"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, '6+'].map((n) => (
                      <option key={n} value={n}>{n} BHK</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <select
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary outline-none"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, '5+'].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {propertyType === 'buy' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facing">Facing Direction</Label>
                    <select
                      id="facing"
                      name="facing"
                      value={formData.facing}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary outline-none"
                    >
                      <option value="">Select</option>
                      {['North', 'South', 'East', 'West', 'North-East', 'South-West'].map((dir) => (
                        <option key={dir} value={dir}>{dir}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Property Age</Label>
                    <select
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary outline-none"
                    >
                      <option value="">Select</option>
                      {['New', '1-3 years', '3-5 years', '5-10 years', '10+ years'].map((age) => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your property..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-[120px] bg-secondary/50"
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Property Photos
            </h2>
            <p className="text-sm text-muted-foreground mb-4">Upload photos with GPS data for verification</p>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each (min 3 photos)</p>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-14 btn-gradient-primary text-lg font-semibold rounded-xl glow-primary"
          >
            <Building className="w-5 h-5 mr-2" />
            Submit Property for Review
          </Button>
        </motion.form>
      </main>
    </div>
  );
};

export default PostProperty;
