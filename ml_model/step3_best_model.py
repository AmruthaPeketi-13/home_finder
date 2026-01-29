import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

print("=" * 60)
print("BEST MODEL - USING XGBOOST")
print("=" * 60)

# Load cleaned data
print("\n📂 Loading cleaned data...")
df = pd.read_csv('dataset/data_cleaned.csv')

# Add features
le_locality = LabelEncoder()
df['locality_encoded'] = le_locality.fit_transform(df['locality'])

def extract_bhk(house_type):
    if 'BHK' in str(house_type):
        try:
            return int(str(house_type).split('BHK')[0].strip()[-1])
        except:
            return 0
    return 0

df['bhk_type'] = df['house_type'].apply(extract_bhk)
df['area_per_bed'] = df['area'] / (df['beds'] + 1)

# More feature engineering
df['total_rooms'] = df['beds'] + df['bathrooms']
df['luxury_score'] = (df['bathrooms'] * 2) + df['balconies'] + df['furnishing_encoded']

features = [
    'city_encoded', 
    'locality_encoded',
    'area', 
    'area_per_bed',
    'beds', 
    'bathrooms', 
    'balconies', 
    'furnishing_encoded',
    'bhk_type',
    'total_rooms',
    'luxury_score'
]

X = df[features]
y = df['rent']

print(f"📋 Features: {len(features)} features")

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Try to use XGBoost, fallback to Random Forest if not available
print("\n🤖 Training model...")
try:
    from xgboost import XGBRegressor
    print("Using XGBoost (best algorithm)...")
    
    model = XGBRegressor(
        n_estimators=300,
        max_depth=8,
        learning_rate=0.1,
        random_state=42,
        n_jobs=-1
    )
    model_type = "XGBoost"
except ImportError:
    print("XGBoost not installed, using Random Forest...")
    from sklearn.ensemble import RandomForestRegressor
    
    model = RandomForestRegressor(
        n_estimators=300,
        max_depth=25,
        min_samples_split=3,
        random_state=42,
        n_jobs=-1
    )
    model_type = "Random Forest"

model.fit(X_train, y_train)
print(f"✅ {model_type} training complete!")

# Evaluate
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\n🎯 BEST Model Performance ({model_type}):")
print(f"   Mean Absolute Error: ₹{mae:,.0f}")
print(f"   R² Score: {r2:.3f}")

print(f"\n📈 Progress:")
print(f"   Original: 0.615 (61.5%)")
print(f"   Improved: 0.676 (67.6%)")
print(f"   Best:     {r2:.3f} ({r2*100:.1f}%)")

if r2 >= 0.70:
    print(f"\n🎉 SUCCESS! Reached 70%+ accuracy!")
elif r2 >= 0.68:
    print(f"\n✅ VERY CLOSE! Almost at 70%")
else:
    print(f"\n⚠️ Still improving...")

# Save
joblib.dump(model, 'rent_prediction_model_best.pkl')
joblib.dump(le_locality, 'locality_encoder.pkl')

print(f"\n💾 Saved as: rent_prediction_model_best.pkl")
print("\n" + "=" * 60)
print(f"✅ BEST MODEL COMPLETE! ({model_type})")
print("=" * 60)

# If XGBoost not installed, show install command
if model_type == "Random Forest":
    print("\n💡 TIP: Install XGBoost for even better accuracy:")
    print("   pip install xgboost")
    print("   Then run this script again!")
