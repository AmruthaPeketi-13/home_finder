import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

print("=" * 60)
print("STEP 3: TRAINING THE ML MODEL")
print("=" * 60)

# Load cleaned data
print("\n📂 Loading cleaned data...")
df = pd.read_csv('dataset/data_cleaned.csv')
print(f"Dataset size: {df.shape[0]} properties")

# Prepare features and target
features = ['city_encoded', 'area', 'beds', 'bathrooms', 'balconies', 'furnishing_encoded']
X = df[features]  # Input features
y = df['rent']    # Target (what we want to predict)

print(f"\n📋 Features (inputs): {features}")
print(f"🎯 Target (output): rent")

# Split data into training and testing sets
print("\n✂️ Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Training set: {X_train.shape[0]} properties (80%)")
print(f"Testing set: {X_test.shape[0]} properties (20%)")

# Train the model
print("\n🤖 Training Random Forest model...")
print("(This may take 10-30 seconds...)")

model = RandomForestRegressor(
    n_estimators=100,  # 100 decision trees
    random_state=42,
    n_jobs=-1  # Use all CPU cores
)

model.fit(X_train, y_train)
print("✅ Training complete!")

# Test the model
print("\n📊 Evaluating model performance...")
y_pred = model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\n🎯 Model Performance:")
print(f"   Mean Absolute Error: ₹{mae:,.0f}")
print(f"   R² Score: {r2:.3f}")

print(f"\n💡 What this means:")
print(f"   - On average, predictions are off by ₹{mae:,.0f}")
if r2 > 0.8:
    print(f"   - R² of {r2:.3f} is EXCELLENT! (80%+ accuracy)")
elif r2 > 0.7:
    print(f"   - R² of {r2:.3f} is GOOD (70-80% accuracy)")
else:
    print(f"   - R² of {r2:.3f} is OKAY (can be improved)")

# Show feature importance
print("\n📈 Feature Importance (what matters most):")
importance_df = pd.DataFrame({
    'Feature': features,
    'Importance': model.feature_importances_
}).sort_values('Importance', ascending=False)

for idx, row in importance_df.iterrows():
    print(f"   {row['Feature']}: {row['Importance']:.3f}")

# Test with example predictions
print("\n🧪 Testing with example predictions:")

# Example 1: Mumbai 2BHK
example1 = [[1, 1200, 2, 2, 1, 1]]  # Mumbai, 1200sqft, 2bed, 2bath, 1balcony, Semi-Furnished
pred1 = model.predict(example1)[0]
print(f"   Mumbai, 1200 sqft, 2BHK, Semi-Furnished: ₹{pred1:,.0f}/month")

# Example 2: Bangalore 3BHK
example2 = [[0, 1800, 3, 2, 2, 0]]  # Bangalore, 1800sqft, 3bed, 2bath, 2balconies, Furnished
pred2 = model.predict(example2)[0]
print(f"   Bangalore, 1800 sqft, 3BHK, Furnished: ₹{pred2:,.0f}/month")

# Example 3: Pune 1BHK
example3 = [[4, 600, 1, 1, 1, 2]]  # Pune, 600sqft, 1bed, 1bath, 1balcony, Unfurnished
pred3 = model.predict(example3)[0]
print(f"   Pune, 600 sqft, 1BHK, Unfurnished: ₹{pred3:,.0f}/month")

# Save the model
print("\n💾 Saving the trained model...")
joblib.dump(model, 'rent_prediction_model.pkl')
print("✅ Model saved as: rent_prediction_model.pkl")

print("\n" + "=" * 60)
print("✅ STEP 3 COMPLETE! Model is trained and ready to use!")
print("=" * 60)
