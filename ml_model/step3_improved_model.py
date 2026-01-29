import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

print("=" * 60)
print("IMPROVED MODEL - WITH MORE FEATURES")
print("=" * 60)

# Load cleaned data
print("\n📂 Loading cleaned data...")
df = pd.read_csv('dataset/data_cleaned.csv')
print(f"Dataset size: {df.shape[0]} properties")

# ===== ADD MORE FEATURES =====
print("\n🔧 Adding more features...")

# Encode locality (neighborhood)
le_locality = LabelEncoder()
df['locality_encoded'] = le_locality.fit_transform(df['locality'])
print(f"✅ Added locality: {len(le_locality.classes_)} unique neighborhoods")

# Extract property type from house_type (BHK, Flat, House, etc.)
def extract_bhk(house_type):
    if 'BHK' in str(house_type):
        try:
            return int(str(house_type).split('BHK')[0].strip()[-1])
        except:
            return 0
    return 0

df['bhk_type'] = df['house_type'].apply(extract_bhk)
print(f"✅ Added BHK type")

# Create area per bedroom ratio
df['area_per_bed'] = df['area'] / (df['beds'] + 1)  # +1 to avoid division by zero
print(f"✅ Added area per bedroom ratio")

# Prepare features - NOW WITH MORE!
features = [
    'city_encoded', 
    'locality_encoded',  # NEW!
    'area', 
    'area_per_bed',      # NEW!
    'beds', 
    'bathrooms', 
    'balconies', 
    'furnishing_encoded',
    'bhk_type'           # NEW!
]

X = df[features]
y = df['rent']

print(f"\n📋 Features (inputs): {len(features)} features")
print(f"   Old model: 6 features")
print(f"   New model: {len(features)} features (+{len(features)-6})")

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\n✂️ Splitting data...")
print(f"Training set: {X_train.shape[0]} properties (80%)")
print(f"Testing set: {X_test.shape[0]} properties (20%)")

# Train improved model with better parameters
print("\n🤖 Training IMPROVED Random Forest model...")
print("(Using 200 trees instead of 100...)")

model = RandomForestRegressor(
    n_estimators=200,      # More trees = better accuracy
    max_depth=20,          # Deeper trees = more complex patterns
    min_samples_split=5,   # Better generalization
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)
print("✅ Training complete!")

# Evaluate
print("\n📊 Evaluating model performance...")
y_pred = model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\n🎯 IMPROVED Model Performance:")
print(f"   Mean Absolute Error: ₹{mae:,.0f}")
print(f"   R² Score: {r2:.3f}")

# Compare with old model
old_mae = 19813
old_r2 = 0.615

print(f"\n📈 Comparison with Old Model:")
print(f"   MAE: ₹{old_mae:,.0f} → ₹{mae:,.0f} (Improved by ₹{old_mae-mae:,.0f})")
print(f"   R²: {old_r2:.3f} → {r2:.3f} (Improved by {(r2-old_r2)*100:.1f}%)")

if r2 > 0.7:
    print(f"\n🎉 SUCCESS! R² > 0.7 (GOOD accuracy)")
elif r2 > 0.65:
    print(f"\n✅ BETTER! R² improved but still below 0.7")
else:
    print(f"\n⚠️ Still needs improvement")

# Feature importance
print("\n📈 Feature Importance:")
importance_df = pd.DataFrame({
    'Feature': features,
    'Importance': model.feature_importances_
}).sort_values('Importance', ascending=False)

for idx, row in importance_df.iterrows():
    print(f"   {row['Feature']}: {row['Importance']:.3f}")

# Save improved model
print("\n💾 Saving improved model...")
joblib.dump(model, 'rent_prediction_model_improved.pkl')
joblib.dump(le_locality, 'locality_encoder.pkl')
print("✅ Saved as: rent_prediction_model_improved.pkl")

print("\n" + "=" * 60)
print("✅ IMPROVED MODEL COMPLETE!")
print("=" * 60)
