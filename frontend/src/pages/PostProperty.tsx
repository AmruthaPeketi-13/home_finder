import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, MapPin, Upload, Building, Camera, Check, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PostProperty = () => {
  const [propertyType, setPropertyType] = useState<'buy' | 'rent' | 'book'>('rent');
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictedRent, setPredictedRent] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    city: '',
    locality: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    furnishing: '',
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

  const handleSuggestRent = async () => {
    // Validate required fields
    if (!formData.city || !formData.sqft || !formData.bedrooms || !formData.bathrooms) {
      toast.error('Please fill in city, area, bedrooms, and bathrooms first');
      return;
    }

    setIsPredicting(true);
    setPredictedRent(null);

    try {
      const { predictRent } = await import('@/lib/mlService');

      const result = await predictRent({
        city: formData.city,
        locality: formData.locality || 'Unknown',
        area: parseFloat(formData.sqft),
        beds: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        balconies: parseInt(formData.balconies) || 0,
        furnishing: formData.furnishing || 'Unfurnished',
      });

      if (result.success) {
        setPredictedRent(result.formatted_rent);
        setFormData(prev => ({ ...prev, price: result.predicted_rent.toString() }));
        toast.success('Rent predicted successfully!', {
          description: `Suggested rent: ${result.formatted_rent}/month`,
        });
      } else {
        toast.error('Prediction failed', {
          description: result.error || 'Please try again',
        });
      }
    } catch (error: any) {
      toast.error('Failed to predict rent', {
        description: error.message || 'ML service unavailable',
      });
    } finally {
      setIsPredicting(false);
    }
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {typeOptions.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setPropertyType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left min-h-[80px] ${propertyType === type.id
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary outline-none"
                    required
                  >
                    <option value="">Select City</option>
                    {['Mumbai', 'Bangalore', 'Pune', 'New Delhi', 'Nagpur'].map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locality">Locality</Label>
                  <Input
                    id="locality"
                    name="locality"
                    placeholder="e.g., Goregaon East"
                    value={formData.locality}
                    onChange={handleInputChange}
                    className="h-12 bg-secondary/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Full Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter complete address"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="pl-12 h-12 bg-secondary/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="price">Price (₹) {propertyType === 'rent' && '*'}</Label>
                  {propertyType === 'rent' && predictedRent && (
                    <span className="text-sm text-primary font-medium">
                      AI Suggested: {predictedRent}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder={propertyType === 'buy' ? 'Total price' : 'Per month/night'}
                    value={formData.price}
                    onChange={handleInputChange}
                    className="h-12 bg-secondary/50"
                    required={propertyType === 'rent'}
                  />
                  {propertyType === 'rent' && (
                    <Button
                      type="button"
                      onClick={handleSuggestRent}
                      disabled={isPredicting}
                      className="h-12 px-6 btn-gradient-primary glow-primary whitespace-nowrap w-full sm:w-auto"
                    >
                      {isPredicting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Predicting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Suggest Rent
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sqft">Area (sq.ft) *</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="balconies">Balconies</Label>
                  <select
                    id="balconies"
                    name="balconies"
                    value={formData.balconies}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary outline-none"
                  >
                    <option value="">Select</option>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary outline-none"
                    required
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} BHK</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <select
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary outline-none"
                    required
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {propertyType === 'rent' && (
                <div className="space-y-2">
                  <Label htmlFor="furnishing">Furnishing Status</Label>
                  <select
                    id="furnishing"
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:border-primary outline-none"
                  >
                    <option value="">Select</option>
                    {['Furnished', 'Semi-Furnished', 'Unfurnished'].map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}

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
