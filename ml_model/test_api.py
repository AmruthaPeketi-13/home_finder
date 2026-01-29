import requests
import json

# Test the Flask API
API_URL = "http://localhost:5001"

print("Testing ML Rent Prediction API...")
print("="*60)

# Test 1: Check if API is running
print("\n1. Testing API status...")
try:
    response = requests.get(f"{API_URL}/")
    print(f"✅ API Status: {response.json()}")
except Exception as e:
    print(f"❌ Error: {e}")
    print("Make sure Flask API is running: python app.py")
    exit()

# Test 2: Get available cities
print("\n2. Getting available cities...")
response = requests.get(f"{API_URL}/cities")
cities = response.json()['cities']
print(f"✅ Available cities: {cities}")

# Test 3: Predict rent for Mumbai 2BHK
print("\n3. Testing rent prediction - Mumbai 2BHK...")
test_data = {
    "city": "Mumbai",
    "locality": "Goregaon East",
    "area": 1200,
    "beds": 2,
    "bathrooms": 2,
    "balconies": 1,
    "furnishing": "Semi-Furnished"
}

response = requests.post(
    f"{API_URL}/predict",
    json=test_data,
    headers={'Content-Type': 'application/json'}
)

result = response.json()
if result['success']:
    print(f"✅ Prediction successful!")
    print(f"   Input: {test_data}")
    print(f"   Predicted Rent: {result['formatted_rent']}/month")
else:
    print(f"❌ Prediction failed: {result.get('error')}")

# Test 4: Predict rent for Bangalore 3BHK
print("\n4. Testing rent prediction - Bangalore 3BHK...")
test_data2 = {
    "city": "Bangalore",
    "locality": "Whitefield",
    "area": 1800,
    "beds": 3,
    "bathrooms": 2,
    "balconies": 2,
    "furnishing": "Furnished"
}

response = requests.post(f"{API_URL}/predict", json=test_data2)
result = response.json()

if result['success']:
    print(f"✅ Prediction successful!")
    print(f"   Predicted Rent: {result['formatted_rent']}/month")

# Test 5: Predict rent for Pune 1BHK
print("\n5. Testing rent prediction - Pune 1BHK...")
test_data3 = {
    "city": "Pune",
    "locality": "Mundhwa",
    "area": 600,
    "beds": 1,
    "bathrooms": 1,
    "balconies": 1,
    "furnishing": "Unfurnished"
}

response = requests.post(f"{API_URL}/predict", json=test_data3)
result = response.json()

if result['success']:
    print(f"✅ Prediction successful!")
    print(f"   Predicted Rent: {result['formatted_rent']}/month")

print("\n" + "="*60)
print("✅ All tests completed!")
print("="*60)
