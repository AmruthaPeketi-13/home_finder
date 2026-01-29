import pandas as pd

# Load the CSV file
print("Loading dataset/data.csv...")
df = pd.read_csv('dataset/data.csv')

# Show basic information
print("\n✅ Data loaded successfully!")
print(f"\nTotal properties: {df.shape[0]}")
print(f"Total columns: {df.shape[1]}")

print("\n📋 Column names:")
print(df.columns.tolist())

print("\n👀 First 5 rows:")
print(df.head())

print("\n📊 Data types:")
print(df.dtypes)

print("\n❓ Missing values:")
print(df.isnull().sum())
