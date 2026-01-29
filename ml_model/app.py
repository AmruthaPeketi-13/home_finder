from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow requests from your Node.js backend

# Load the trained model and encoders
print("Loading ML model...")
model = joblib.load('rent_prediction_model_best.pkl')
locality_encoder = joblib.load('locality_encoder.pkl')

# Load city and furnishing encoders from the cleaned data
df = pd.read_csv('dataset/data_cleaned.csv')
from sklearn.preprocessing import LabelEncoder

le_city = LabelEncoder()
le_city.fit(df['city'])

le_furnishing = LabelEncoder()
le_furnishing.fit(df['furnishing'])

print("✅ Model loaded successfully!")
print(f"Available cities: {list(le_city.classes_)}")
print(f"Available furnishing: {list(le_furnishing.classes_)}")

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'ML Rent Prediction API',
        'status': 'running',
        'model': 'XGBoost',
        'accuracy': '71.5%'
    })

@app.route('/predict', methods=['POST'])
def predict_rent():
    try:
        # Get data from request
        data = request.json
        
        # Extract features
        city = data.get('city')
        locality = data.get('locality', 'Unknown')
        area = float(data.get('area'))
        beds = int(data.get('beds'))
        bathrooms = int(data.get('bathrooms'))
        balconies = int(data.get('balconies', 0))
        furnishing = data.get('furnishing', 'Unfurnished')
        
        # Encode categorical variables
        try:
            city_encoded = le_city.transform([city])[0]
        except:
            return jsonify({'error': f'Invalid city. Available: {list(le_city.classes_)}'}), 400
        
        try:
            locality_encoded = locality_encoder.transform([locality])[0]
        except:
            # If locality not found, use a default value
            locality_encoded = 0
        
        try:
            furnishing_encoded = le_furnishing.transform([furnishing])[0]
        except:
            furnishing_encoded = 2  # Default to Unfurnished
        
        # Extract BHK type (simplified)
        bhk_type = beds
        
        # Calculate derived features
        area_per_bed = area / (beds + 1)
        total_rooms = beds + bathrooms
        luxury_score = (bathrooms * 2) + balconies + furnishing_encoded
        
        # Prepare features in the same order as training
        features = np.array([[
            city_encoded,
            locality_encoded,
            area,
            area_per_bed,
            beds,
            bathrooms,
            balconies,
            furnishing_encoded,
            bhk_type,
            total_rooms,
            luxury_score
        ]])
        
        # Make prediction
        predicted_rent = float(model.predict(features)[0])  # Convert to Python float
        
        # Return result
        return jsonify({
            'success': True,
            'predicted_rent': round(predicted_rent, 2),
            'formatted_rent': f"₹{int(predicted_rent):,}",
            'input': {
                'city': city,
                'locality': locality,
                'area': area,
                'beds': beds,
                'bathrooms': bathrooms,
                'balconies': balconies,
                'furnishing': furnishing
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/cities', methods=['GET'])
def get_cities():
    return jsonify({
        'cities': list(le_city.classes_)
    })

@app.route('/furnishing-types', methods=['GET'])
def get_furnishing_types():
    return jsonify({
        'furnishing_types': list(le_furnishing.classes_)
    })

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 ML Rent Prediction API Server")
    print("="*60)
    print("📍 Running on: http://localhost:5001")
    print("📊 Model: XGBoost (71.5% accuracy)")
    print("🎯 Endpoint: POST /predict")
    print("="*60 + "\n")
    
    app.run(host='0.0.0.0', port=5001, debug=True)
