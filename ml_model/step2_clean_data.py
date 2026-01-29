import pandas as pd
import numpy as np

# Load data
print("Loading dataset...")
df = pd.read_csv('dataset/data.csv')
print(f"Original dataset: {df.shape[0]} properties\n")

# ===== STEP 1: Remove Outliers =====
print("🧹 Cleaning data...")

# Remove properties with unrealistic area (too small or too large)
df = df[(df['area'] >= 100) & (df['area'] <= 10000)]
print(f"After removing area outliers: {df.shape[0]} properties")

# Remove properties with unrealistic rent (too cheap or too expensive)
df = df[(df['rent'] >= 5000) & (df['rent'] <= 500000)]
print(f"After removing rent outliers: {df.shape[0]} properties")

# Remove properties with 0 bedrooms (likely errors)
df = df[df['beds'] > 0]
print(f"After removing 0 bedroom properties: {df.shape[0]} properties")

# ===== STEP 2: Convert Text to Numbers =====
print("\n🔢 Converting text to numbers...")

# Show unique cities
print(f"\nCities in dataset: {df['city'].unique().tolist()}")

# Convert city to numbers (Mumbai=0, Bangalore=1, etc.)
from sklearn.preprocessing import LabelEncoder
le_city = LabelEncoder()
df['city_encoded'] = le_city.fit_transform(df['city'])
print(f"City encoding: {dict(zip(le_city.classes_, range(len(le_city.classes_))))}")

# Show unique furnishing types
print(f"\nFurnishing types: {df['furnishing'].unique().tolist()}")

# Convert furnishing to numbers
le_furnishing = LabelEncoder()
df['furnishing_encoded'] = le_furnishing.fit_transform(df['furnishing'])
print(f"Furnishing encoding: {dict(zip(le_furnishing.classes_, range(len(le_furnishing.classes_))))}")

# ===== STEP 3: Select Features =====
print("\n📋 Selecting features for training...")

# These are the features we'll use to predict rent
features = ['city_encoded', 'area', 'beds', 'bathrooms', 'balconies', 'furnishing_encoded']
print(f"Features: {features}")
print(f"Target: rent")

# ===== STEP 4: Save Cleaned Data =====
df.to_csv('dataset/data_cleaned.csv', index=False)
print(f"\n✅ Cleaned data saved to: dataset/data_cleaned.csv")
print(f"Final dataset size: {df.shape[0]} properties")

# Show sample of cleaned data
print("\n👀 Sample of cleaned data:")
print(df[features + ['rent']].head())

print("\n✅ Step 2 Complete! Data is ready for training.")
