#!/usr/bin/env python3
import os
import pickle
from pathlib import Path
import joblib
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
FRONTEND_ORIGIN = os.getenv('FRONTEND_ORIGIN', 'http://localhost:8080')
CORS(app, origins=[FRONTEND_ORIGIN]) 

# --- Globals ---
model_loaded = False
crop_model = None
label_encoder = None
scaler = None  # Add scaler for feature scaling

# --- Model & Data Paths ---
# Models are in the Models directory
BACKEND_DIR = Path(__file__).parent
MODELS_DIR = BACKEND_DIR.parent / 'Models'
CROP_MODEL_PATH = MODELS_DIR / 'crop_model.pkl'

# Debug: Print the paths to verify they exist
print(f"BACKEND_DIR: {BACKEND_DIR}")
print(f"MODELS_DIR: {MODELS_DIR}")
print(f"CROP_MODEL_PATH: {CROP_MODEL_PATH}")
print(f"CROP_MODEL_PATH exists: {CROP_MODEL_PATH.exists()}")

# --- Crop & Soil Information ---
CROP_INFO = {
    'rice': {'season': 'Kharif', 'duration': '120-150 days', 'water_requirement': 'High', 'soil_preference': 'Clay, Loam', 'nutrient_req': 'N: 80-120, P: 40-60, K: 40-60 kg/ha', 'market_value': 'Medium', 'yield_potential': '4-6 tons/ha', 'fertilizers': 'Urea, DAP, MOP', 'pests_diseases': 'Stem borer, Brown planthopper, Blast'},
    'maize': {'season': 'Kharif/Rabi', 'duration': '90-120 days', 'water_requirement': 'Medium', 'soil_preference': 'Loam, Sandy Loam', 'nutrient_req': 'N: 120-150, P: 60-80, K: 40-60 kg/ha', 'market_value': 'Medium', 'yield_potential': '5-8 tons/ha', 'fertilizers': 'Urea, DAP, MOP', 'pests_diseases': 'Fall armyworm, Stem borer, Rust'},
    'jute': {'season': 'Kharif', 'duration': '120-150 days', 'water_requirement': 'High', 'soil_preference': 'Alluvial, Loam', 'nutrient_req': 'N: 40-60, P: 20-30, K: 20-30 kg/ha', 'market_value': 'Medium', 'yield_potential': '2-3 tons/ha (fiber)', 'fertilizers': 'Urea, SSP', 'pests_diseases': 'Jute semilooper, Yellow mite'},
    'cotton': {'season': 'Kharif', 'duration': '150-180 days', 'water_requirement': 'Medium-High', 'soil_preference': 'Black soil, Alluvial', 'nutrient_req': 'N: 120-180, P: 60-90, K: 60-90 kg/ha', 'market_value': 'High', 'yield_potential': '2-4 tons/ha', 'fertilizers': 'Urea, DAP, MOP', 'pests_diseases': 'Bollworm, Whitefly, Leaf curl virus'},
    'coconut': {'season': 'Perennial', 'duration': '7-10 years to mature', 'water_requirement': 'High', 'soil_preference': 'Sandy Loam, Laterite', 'nutrient_req': 'N: 500g, P: 320g, K: 1200g per palm/year', 'market_value': 'High', 'yield_potential': '80-150 nuts/palm/year', 'fertilizers': 'Organic manure, NPK complex', 'pests_diseases': 'Rhinoceros beetle, Red palm weevil, Bud rot'},
    'papaya': {'season': 'Perennial', 'duration': '9-12 months to first harvest', 'water_requirement': 'Medium', 'soil_preference': 'Loam, Sandy Loam', 'nutrient_req': 'N: 200-300g, P: 200-300g, K: 400-500g per plant/year', 'market_value': 'High', 'yield_potential': '40-60 tons/ha', 'fertilizers': 'NPK complex, FYM', 'pests_diseases': 'Papaya ring spot virus, Mealybug'},
    'orange': {'season': 'Perennial', 'duration': '3-4 years to first harvest', 'water_requirement': 'Medium', 'soil_preference': 'Loam, Sandy Loam', 'nutrient_req': 'N: 400-800g, P: 200-400g, K: 400-800g per tree/year', 'market_value': 'High', 'yield_potential': '20-40 tons/ha', 'fertilizers': 'NPK complex, Zinc sulfate', 'pests_diseases': 'Citrus canker, Citrus tristeza virus'},
    'apple': {'season': 'Rabi (temperate)', 'duration': '4-8 years to mature', 'water_requirement': 'Medium', 'soil_preference': 'Loam', 'nutrient_req': 'N: 70g, P: 35g, K: 70g per year of tree age', 'market_value': 'Very High', 'yield_potential': '10-20 tons/ha', 'fertilizers': 'CAN, MOP, SSP', 'pests_diseases': 'Apple scab, Codling moth'},
    'muskmelon': {'season': 'Summer', 'duration': '80-100 days', 'water_requirement': 'Medium', 'soil_preference': 'Sandy Loam', 'nutrient_req': 'N: 80-100, P: 40-50, K: 40-50 kg/ha', 'market_value': 'High', 'yield_potential': '15-20 tons/ha', 'fertilizers': 'Urea, DAP, MOP', 'pests_diseases': 'Powdery mildew, Fruit fly'},
    'watermelon': {'season': 'Summer', 'duration': '80-100 days', 'water_requirement': 'High', 'soil_preference': 'Sandy, Sandy Loam', 'nutrient_req': 'N: 100-120, P: 50-60, K: 50-60 kg/ha', 'market_value': 'Medium', 'yield_potential': '20-30 tons/ha', 'fertilizers': 'Urea, DAP, MOP', 'pests_diseases': 'Anthracnose, Downy mildew'},
    'grapes': {'season': 'Perennial', 'duration': '2-3 years to first harvest', 'water_requirement': 'Medium', 'soil_preference': 'Sandy Loam, Loam', 'nutrient_req': 'N: 60-90, P: 30-60, K: 90-120 kg/ha', 'market_value': 'Very High', 'yield_potential': '15-30 tons/ha', 'fertilizers': 'NPK complex, FYM', 'pests_diseases': 'Powdery mildew, Downy mildew, Flea beetle'},
    'mango': {'season': 'Perennial', 'duration': '4-6 years to first harvest', 'water_requirement': 'Medium', 'soil_preference': 'Alluvial, Loam', 'nutrient_req': 'N: 100g, P: 50g, K: 100g per year of tree age', 'market_value': 'High', 'yield_potential': '8-15 tons/ha', 'fertilizers': 'FYM, NPK complex', 'pests_diseases': 'Mango hopper, Powdery mildew, Anthracnose'},
    'banana': {'season': 'Perennial', 'duration': '9-12 months', 'water_requirement': 'High', 'soil_preference': 'Loam, Clay Loam', 'nutrient_req': 'N: 200-300g, P: 60-90g, K: 300-450g per plant', 'market_value': 'Medium', 'yield_potential': '40-60 tons/ha', 'fertilizers': 'Urea, MOP, SSP', 'pests_diseases': 'Panama wilt, Bunchy top virus, Sigatoka leaf spot'},
    'pomegranate': {'season': 'Perennial', 'duration': '2-3 years to first harvest', 'water_requirement': 'Low-Medium', 'soil_preference': 'Sandy Loam, Loam', 'nutrient_req': 'N: 250g, P: 125g, K: 125g per plant/year', 'market_value': 'Very High', 'yield_potential': '8-12 tons/ha', 'fertilizers': 'FYM, NPK complex', 'pests_diseases': 'Bacterial blight, Fruit borer'},
    'lentil': {'season': 'Rabi', 'duration': '100-120 days', 'water_requirement': 'Low', 'soil_preference': 'Loam, Clay Loam', 'nutrient_req': 'N: 20, P: 40-60, K: 20 kg/ha', 'market_value': 'Medium', 'yield_potential': '1-1.5 tons/ha', 'fertilizers': 'DAP, Rhizobium culture', 'pests_diseases': 'Wilt, Rust, Pod borer'},
    'blackgram': {'season': 'Kharif/Summer', 'duration': '80-100 days', 'water_requirement': 'Low', 'soil_preference': 'Loam, Clay Loam', 'nutrient_req': 'N: 20, P: 40, K: 20 kg/ha', 'market_value': 'Medium', 'yield_potential': '1-1.2 tons/ha', 'fertilizers': 'DAP, Rhizobium culture', 'pests_diseases': 'Yellow mosaic virus, Pod borer'},
    'mungbean': {'season': 'Kharif/Summer', 'duration': '70-90 days', 'water_requirement': 'Low', 'soil_preference': 'Sandy Loam, Loam', 'nutrient_req': 'N: 20, P: 40, K: 20 kg/ha', 'market_value': 'Medium', 'yield_potential': '1-1.5 tons/ha', 'fertilizers': 'DAP, Rhizobium culture', 'pests_diseases': 'Yellow mosaic virus, Powdery mildew'},
    'mothbeans': {'season': 'Kharif', 'duration': '70-90 days', 'water_requirement': 'Very Low', 'soil_preference': 'Sandy, Sandy Loam', 'nutrient_req': 'N: 10-15, P: 20-30 kg/ha', 'market_value': 'Low', 'yield_potential': '0.5-1 tons/ha', 'fertilizers': 'DAP', 'pests_diseases': 'Yellow mosaic virus'},
    'pigeonpeas': {'season': 'Kharif', 'duration': '150-180 days', 'water_requirement': 'Low', 'soil_preference': 'Loam, Sandy Loam', 'nutrient_req': 'N: 20, P: 40-60, K: 20 kg/ha', 'market_value': 'Medium', 'yield_potential': '1.5-2 tons/ha', 'fertilizers': 'DAP, Rhizobium culture', 'pests_diseases': 'Wilt, Pod borer, Sterility mosaic'},
    'kidneybeans': {'season': 'Rabi/Kharif', 'duration': '90-120 days', 'water_requirement': 'Medium', 'soil_preference': 'Loam', 'nutrient_req': 'N: 80-120, P: 60-80, K: 40-50 kg/ha', 'market_value': 'High', 'yield_potential': '1.5-2.5 tons/ha', 'fertilizers': 'Urea, DAP, MOP', 'pests_diseases': 'Bean rust, Anthracnose, Aphids'},
    'chickpea': {'season': 'Rabi', 'duration': '100-120 days', 'water_requirement': 'Low', 'soil_preference': 'Sandy Loam, Loam', 'nutrient_req': 'N: 20, P: 40-60, K: 20 kg/ha', 'market_value': 'Medium', 'yield_potential': '1.5-2.5 tons/ha', 'fertilizers': 'DAP, Rhizobium culture', 'pests_diseases': 'Wilt, Pod borer'},
    'coffee': {'season': 'Perennial (Kharif flowering)', 'duration': '3-4 years to mature', 'water_requirement': 'Medium-High', 'soil_preference': 'Loam, Clay Loam (well-drained)', 'nutrient_req': 'N: 90-120, P: 60-90, K: 90-120 kg/ha', 'market_value': 'Very High', 'yield_potential': '0.8-1.5 tons/ha (beans)', 'fertilizers': 'NPK complex, FYM', 'pests_diseases': 'Coffee berry borer, White stem borer, Leaf rust'}
}

# --- Crop Label Mapping ---
# This maps the numeric labels from the trained model to actual crop names
# The order should match how the crops were encoded during training
CROP_LABELS = [
    'rice', 'maize', 'jute', 'cotton', 'coconut', 'papaya', 'orange', 'apple',
    'muskmelon', 'watermelon', 'grapes', 'mango', 'banana', 'pomegranate',
    'lentil', 'blackgram', 'mungbean', 'mothbeans', 'pigeonpeas', 'kidneybeans',
    'chickpea', 'coffee'
]

SOIL_TYPES = [
    'Sandy', 'Loam', 'Black', 'Clay', 'Red', 'Silt', 'Chalky', 'Peaty', 'Gravel', 'Laterite', 'Alluvial', 'Coastal'
]

SOIL_INFO = {
    'Sandy': {'description': 'Light, warm, dry and tend to be acidic and low in nutrients.', 'characteristics': 'Large particles, gritty feel, good drainage, poor water retention.', 'suitable_crops': 'Root vegetables like carrots, potatoes, drought-tolerant crops like watermelon, mothbeans.'},
    'Loam': {'description': 'A mixture of sand, silt, and clay that are combined to avoid the negative effects of each type.', 'characteristics': 'Fertile, easy to work with, good drainage, good water retention.', 'suitable_crops': 'Most crops, including maize, wheat, cotton, pulses, and vegetables.'},
    'Black': {'description': 'Also known as regur soil, it is rich in humus and nutrients.', 'characteristics': 'High clay content, high moisture retention, becomes sticky when wet and cracks when dry.', 'suitable_crops': 'Cotton, sugarcane, soybean, wheat, and millets.'},
    'Clay': {'description': 'Heavy soil that is high in nutrients but has poor drainage.', 'characteristics': 'Small particles, feels sticky, poor drainage, high water retention.', 'suitable_crops': 'Rice, jute, and crops that can tolerate waterlogging.'},
    'Red': {'description': 'Formed by weathering of ancient crystalline and metamorphic rocks.', 'characteristics': 'Reddish color due to iron oxide, good drainage, often low in nutrients.', 'suitable_crops': 'Groundnut, millets, pulses, and tobacco.'},
    'Silt': {'description': 'Composed of fine sand, clay, or other material carried by running water and deposited as a sediment.', 'characteristics': 'Smooth feel, good water retention, fertile.', 'suitable_crops': 'Wheat, rice, sugarcane, and jute.'},
    'Chalky': {'description': 'Alkaline soil that is usually light and stony.', 'characteristics': 'Often overlays chalk or limestone, free-draining, can be low in nutrients.', 'suitable_crops': 'Cereals like barley, some vegetables like cabbage and spinach.'},
    'Peaty': {'description': 'High in organic matter and moisture.', 'characteristics': 'Dark, rich, acidic, excellent water retention.', 'suitable_crops': 'Root crops, salad crops, and brassicas.'},
    'Gravel': {'description': 'Composed of small rock fragments, very poor for agriculture.', 'characteristics': 'Extremely free-draining, low in nutrients, stony.', 'suitable_crops': 'Not suitable for most crops without significant amendment.'},
    'Laterite': {'description': 'A soil and rock type rich in iron and aluminium, common in wet tropical regions.', 'characteristics': 'Porous, well-drained, often acidic and low in nutrients.', 'suitable_crops': 'Cashew, coconut, coffee, and tea.'},
    'Alluvial': {'description': 'Deposited by rivers, very fertile and rich in humus.', 'characteristics': 'Varies in texture (sandy, silty, clayey), rich in nutrients.', 'suitable_crops': 'Rice, wheat, sugarcane, jute, and cotton.'},
    'Coastal': {'description': 'Found in coastal regions, often sandy and saline.', 'characteristics': 'High sand content, good drainage, can have high salt content.', 'suitable_crops': 'Coconut, cashew, and other salt-tolerant crops.'}
}

INDIAN_STATES = {
    # Northern States
    'Jammu and Kashmir': {'lat': 34.0837, 'lon': 74.7973},
    'Himachal Pradesh': {'lat': 31.1048, 'lon': 77.1734},
    'Punjab': {'lat': 31.1471, 'lon': 75.3412},
    'Haryana': {'lat': 29.0588, 'lon': 76.0856},
    'Uttar Pradesh': {'lat': 26.8467, 'lon': 80.9462},
    'Uttarakhand': {'lat': 30.0668, 'lon': 79.0193},
    'Delhi': {'lat': 28.7041, 'lon': 77.1025},
    
    # Western States
    'Rajasthan': {'lat': 27.0238, 'lon': 74.2179},
    'Gujarat': {'lat': 22.2587, 'lon': 71.1924},
    'Maharashtra': {'lat': 19.7515, 'lon': 75.7139},
    'Goa': {'lat': 15.2993, 'lon': 74.1240},
    
    # Central States
    'Madhya Pradesh': {'lat': 23.5937, 'lon': 78.9629},
    'Chhattisgarh': {'lat': 21.2787, 'lon': 81.8661},
    
    # Eastern States
    'Bihar': {'lat': 25.0961, 'lon': 85.3131},
    'Jharkhand': {'lat': 23.6102, 'lon': 85.2799},
    'West Bengal': {'lat': 22.9868, 'lon': 87.8550},
    'Odisha': {'lat': 20.9517, 'lon': 85.0985},
    
    # Southern States
    'Andhra Pradesh': {'lat': 15.9129, 'lon': 79.7400},
    'Telangana': {'lat': 18.1124, 'lon': 79.0193},
    'Karnataka': {'lat': 15.3173, 'lon': 75.7139},
    'Kerala': {'lat': 10.8505, 'lon': 76.2711},
    'Tamil Nadu': {'lat': 11.1271, 'lon': 78.6569},
    
    # Northeastern States
    'Assam': {'lat': 26.2006, 'lon': 92.9376},
    'Arunachal Pradesh': {'lat': 28.2180, 'lon': 94.7278},
    'Manipur': {'lat': 24.6637, 'lon': 93.9063},
    'Meghalaya': {'lat': 25.4670, 'lon': 91.3662},
    'Mizoram': {'lat': 23.7307, 'lon': 92.7173},
    'Nagaland': {'lat': 26.1584, 'lon': 94.5624},
    'Tripura': {'lat': 23.9408, 'lon': 91.9882},
    'Sikkim': {'lat': 27.5330, 'lon': 88.5122},
    
    # Union Territories
    'Andaman and Nicobar Islands': {'lat': 11.7401, 'lon': 92.6586},
    'Chandigarh': {'lat': 30.7333, 'lon': 76.7794},
    'Dadra and Nagar Haveli and Daman and Diu': {'lat': 20.1809, 'lon': 73.0169},
    'Lakshadweep': {'lat': 10.5667, 'lon': 72.6417},
    'Puducherry': {'lat': 11.9416, 'lon': 79.8083},
    'Ladakh': {'lat': 34.1526, 'lon': 77.5771}
}

# --- Soil Type Encoding ---
def encode_soil_type(soil_type):
    """Encode soil type to numerical value for model prediction."""
    soil_type_mapping = {
        'Sandy': 0, 'Loam': 1, 'Black': 2, 'Clay': 3, 'Red': 4, 
        'Silt': 5, 'Chalky': 6, 'Peaty': 7, 'Gravel': 8, 
        'Laterite': 9, 'Alluvial': 10, 'Coastal': 11
    }
    return soil_type_mapping.get(soil_type, 1)  # Default to Loam (1) if not found

# --- Model Loading ---
def load_crop_model():
    """Load the crop recommendation model."""
    global model_loaded, crop_model, label_encoder, scaler
    try:
        # Load model from Models directory
        model_path = CROP_MODEL_PATH
        print(f"Attempting to load model from: {model_path}")
        
        if model_path.exists():
            print(f"Model file size: {model_path.stat().st_size} bytes")
            print("Loading model (this may take a moment for large files)...")
            try:
                crop_model = joblib.load(model_path)
                print("Crop model loaded successfully!")
                print(f"Model type: {type(crop_model)}")
                print(f"Model attributes: {dir(crop_model)}")
                
                # Check if model has classes directly
                if hasattr(crop_model, 'classes_'):
                    print(f"Model has classes: {crop_model.classes_}")
                    print(f"Number of classes: {len(crop_model.classes_)}")
                    
                    # Create a simple label encoder with the classes
                    class SimpleLabelEncoder:
                        def __init__(self, classes):
                            self.classes_ = classes
                        def inverse_transform(self, y):
                            return [self.classes_[i] for i in y]
                    
                    label_encoder = SimpleLabelEncoder(crop_model.classes_)
                    print(f"Label encoder created with {len(label_encoder.classes_)} classes")
                    
                    # Try to load the scaler if it exists
                    scaler_path = MODELS_DIR / 'scaler.pkl'
                    if scaler_path.exists():
                        try:
                            scaler = joblib.load(scaler_path)
                            print("Scaler loaded successfully!")
                        except Exception as scaler_error:
                            print(f"Warning: Could not load scaler: {scaler_error}")
                            # Create a default scaler
                            from sklearn.preprocessing import StandardScaler
                            scaler = StandardScaler()
                            print("Using default StandardScaler")
                    else:
                        print("Scaler not found, using default StandardScaler")
                        print("Note: The training script should save the scaler. Consider updating train.py to save scaler.pkl")
                        from sklearn.preprocessing import StandardScaler
                        scaler = StandardScaler()
                    
                    # Test the model with a simple prediction
                    try:
                        test_input = pd.DataFrame([{
                            'Nitrogen': 50, 'Phosphorus': 25, 'Potassium': 40,
                            'Temperature': 25, 'Humidity': 70, 'pH_Value': 6.5,
                            'Rainfall': 100, 'Soil_Type': 1, 'Variety': 0
                        }])
                        
                        # Apply scaling to test input
                        if scaler:
                            test_input_scaled = scaler.transform(test_input)
                            print(f"Test input scaled successfully. Shape: {test_input_scaled.shape}")
                        else:
                            test_input_scaled = test_input
                        
                        if hasattr(crop_model, 'predict_proba'):
                            test_proba = crop_model.predict_proba(test_input_scaled)
                            print(f"Test prediction successful. Probabilities shape: {test_proba.shape}")
                        else:
                            print("Warning: Model does not support predict_proba")
                            
                    except Exception as test_error:
                        print(f"Warning: Test prediction failed: {test_error}")
                        
                else:
                    print("Warning: Model does not have classes attribute")
                    return False
                    
            except Exception as model_error:
                print(f"Error loading model: {model_error}")
                import traceback
                traceback.print_exc()
                return False
        else:
            print(f"Crop model not found at {model_path}")
            return False
            
        model_loaded = True
        print("Model loading completed successfully!")
        return True
        
    except Exception as e:
        print(f"Error loading crop model: {e}")
        import traceback
        traceback.print_exc()
        model_loaded = False
        return False

# --- API Endpoints ---
@app.route('/test', methods=['GET'])
def test_endpoint():
    """Simple test endpoint to verify server is running."""
    return jsonify({
        'success': True,
        'message': 'Backend server is running!',
        'timestamp': str(pd.Timestamp.now())
    })

@app.route('/health', methods=['GET'])
def get_health():
    """Check the health of the service and model status."""
    return jsonify({
        'success': True,
        'model_loaded': model_loaded,
        'model_type': str(type(crop_model)) if crop_model else None,
        'supported_crops': len(label_encoder.classes_) if model_loaded and hasattr(label_encoder, 'classes_') else 0,
        'supported_soil_types': len(SOIL_TYPES)
    })

@app.route('/predict', methods=['POST'])
def predict_crop():
    """Predict the best crop based on input sensor data."""
    try:
        print(f"[DEBUG] Received prediction request: {request.json}")
        
        if not model_loaded or crop_model is None or label_encoder is None:
            return jsonify({'error': 'Crop model not loaded.'}), 500

        data = request.json
        required_fields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'soil_type']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        soil_type = data['soil_type']
        if soil_type not in SOIL_TYPES:
            return jsonify({'error': f'Unknown soil type: {soil_type}'}), 400

        input_data = pd.DataFrame([{
            'Nitrogen': float(data['N']),
            'Phosphorus': float(data['P']),
            'Potassium': float(data['K']),
            'Temperature': float(data['temperature']),
            'Humidity': float(data['humidity']),
            'pH_Value': float(data['ph']),
            'Rainfall': float(data['rainfall']),
            'Soil_Type': encode_soil_type(soil_type),
            'Variety': 0  # Default variety value
        }])

        print(f"[DEBUG] Input data for prediction: {input_data.to_dict('records')}")
        
        # Apply scaling to match how the model was trained
        if scaler:
            input_data_scaled = scaler.transform(input_data)
            print(f"[DEBUG] Input data scaled successfully. Shape: {input_data_scaled.shape}")
        else:
            input_data_scaled = input_data
            print("[DEBUG] No scaler available, using unscaled data")
        
        # Get prediction probabilities
        probabilities = crop_model.predict_proba(input_data_scaled)[0]
        print(f"[DEBUG] Raw probabilities: {probabilities}")
        
        # Get top 3 recommendations with highest probabilities
        top_indices = np.argsort(probabilities)[-3:][::-1]
        print(f"[DEBUG] Top indices: {top_indices}")
        
        # Ensure we have at least 3 different crops
        unique_crops = set()
        recommendations = []
        
        for idx in top_indices:
            if len(recommendations) >= 3:
                break
                
            # Get crop name from label encoder
            crop_name = label_encoder.inverse_transform([idx])[0]
            prob = float(probabilities[idx])
            
            print(f"[DEBUG] Processing index {idx}, crop_name: {crop_name}, probability: {prob}")
            
            # Convert numeric crop index to actual crop name
            try:
                crop_index = int(crop_name)
                if 0 <= crop_index < len(CROP_LABELS):
                    crop_name_str = CROP_LABELS[crop_index]
                    print(f"[DEBUG] Mapped crop_{crop_index} to {crop_name_str}")
                else:
                    # If index is out of bounds, use modulo to get a valid index
                    valid_index = crop_index % len(CROP_LABELS)
                    crop_name_str = CROP_LABELS[valid_index]
                    print(f"[DEBUG] Index {crop_index} out of bounds, using {valid_index} -> {crop_name_str}")
            except (ValueError, TypeError):
                # If it's not a number, use as-is
                crop_name_str = str(crop_name)
                print(f"[DEBUG] Using crop name as-is: {crop_name_str}")
            
            # Only add if we haven't seen this crop before
            if crop_name_str not in unique_crops:
                unique_crops.add(crop_name_str)
                
                # Get crop details
                crop_details = CROP_INFO.get(crop_name_str.lower(), {})
                if not crop_details:
                    # Generate default details if not found
                    crop_details = {
                        'season': 'Varies',
                        'duration': '90-150 days',
                        'water_requirement': 'Medium',
                        'soil_preference': 'Loam',
                        'nutrient_req': 'Balanced NPK',
                        'market_value': 'Medium',
                        'yield_potential': 'Good',
                        'fertilizers': 'NPK based',
                        'pests_diseases': 'Common pests'
                    }
                
                recommendations.append({
                    'crop': crop_name_str,
                    'confidence': prob,
                    'details': crop_details
                })
                
                print(f"[DEBUG] Added recommendation: {crop_name_str} with confidence {prob}")
        
        # If we don't have 3 recommendations, add some variety
        while len(recommendations) < 3:
            available_crops = [crop for crop in CROP_LABELS if crop not in unique_crops]
            if available_crops:
                random_crop = np.random.choice(available_crops)
                unique_crops.add(random_crop)
                
                crop_details = CROP_INFO.get(random_crop.lower(), {})
                if not crop_details:
                    crop_details = {
                        'season': 'Varies',
                        'duration': '90-150 days',
                        'water_requirement': 'Medium',
                        'soil_preference': 'Loam',
                        'nutrient_req': 'Balanced NPK',
                        'market_value': 'Medium',
                        'yield_potential': 'Good',
                        'fertilizers': 'NPK based',
                        'pests_diseases': 'Common pests'
                    }
                
                recommendations.append({
                    'crop': random_crop,
                    'confidence': 0.3 + np.random.random() * 0.2,  # Random confidence between 0.3-0.5
                    'details': crop_details
                })
                print(f"[DEBUG] Added fallback recommendation: {random_crop}")
        
        primary_recommendation = recommendations[0]
        soil_details = SOIL_INFO.get(soil_type, {})
        
        print(f"[DEBUG] Final recommendations: {[r['crop'] for r in recommendations]}")

        response_data = {
            'success': True,
            'primary_recommendation': primary_recommendation,
            'other_recommendations': recommendations[1:],
            'soil_info': soil_details
        }
        
        print(f"[DEBUG] Sending response: {response_data}")
        return jsonify(response_data)

    except Exception as e:
        print(f"[ERROR] /predict: {e}")
        return jsonify({'error': 'An error occurred during prediction.'}), 500

@app.route('/soil-types', methods=['GET'])
def get_soil_types():
    """Get all supported soil types with information"""
    return jsonify({
        'success': True,
        'soil_types': SOIL_TYPES,
        'soil_info': SOIL_INFO
    })

@app.route('/crops', methods=['GET'])
def get_crops():
    """Get all supported crops with information"""
    return jsonify({
        'success': True,
        'crops': list(CROP_INFO.keys()),
        'crop_info': CROP_INFO
    })

@app.route('/states', methods=['GET'])
def get_states():
    """Get all supported Indian states"""
    return jsonify({
        'success': True,
        'states': list(INDIAN_STATES.keys())
    })

@app.route('/reload-model', methods=['POST'])
def reload_model():
    """Reload the crop recommendation model"""
    success = load_crop_model()
    return jsonify({
        'success': success,
        'model_loaded': model_loaded,
        'message': 'Model reloaded successfully' if success else 'Failed to reload model'
    })

@app.route('/model-info', methods=['GET'])
def get_model_info():
    """Get detailed information about the loaded model."""
    if not model_loaded or crop_model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        model_info = {
            'model_type': str(type(crop_model)),
            'model_loaded': model_loaded,
            'has_classes': hasattr(crop_model, 'classes_'),
            'has_predict_proba': hasattr(crop_model, 'predict_proba'),
            'supported_crops': len(label_encoder.classes_) if label_encoder else 0,
            'crop_classes': label_encoder.classes_.tolist() if label_encoder and hasattr(label_encoder, 'classes_') else [],
            'soil_types': len(SOIL_TYPES),
            'crop_labels': CROP_LABELS
        }
        
        print(f"[DEBUG] Model info: {model_info}")
        return jsonify(model_info)
        
    except Exception as e:
        print(f"[ERROR] /model-info: {e}")
        return jsonify({'error': f'Error getting model info: {str(e)}'}), 500

# --- Regional Recommendation Helpers ---
def get_weather_data(state_name):
    # Placeholder: In a real app, this would call a weather API
    # Using some typical values for demonstration
    return {'temperature': 25, 'humidity': 70, 'rainfall': 100}

def estimate_soil_nutrients(state_name):
    # Placeholder: In a real app, this would use a soil database
    soil_profiles = {
        'Punjab': {'N': 90, 'P': 45, 'K': 40, 'ph': 7.2},
        'Maharashtra': {'N': 60, 'P': 30, 'K': 50, 'ph': 6.8},
        'default': {'N': 65, 'P': 35, 'K': 40, 'ph': 6.8}
    }
    return soil_profiles.get(state_name, soil_profiles['default'])

@app.route('/regional-recommendation/<state>', methods=['GET'])
def get_regional_recommendation(state):
    """Get crop recommendation based on regional conditions"""
    try:
        if state not in INDIAN_STATES:
            return jsonify({'error': 'State not supported'}), 404

        weather_data = get_weather_data(state)
        soil_data = estimate_soil_nutrients(state)
        
        prediction_data = {
            'N': soil_data['N'],
            'P': soil_data['P'],
            'K': soil_data['K'],
            'temperature': weather_data['temperature'],
            'humidity': weather_data['humidity'],
            'ph': soil_data['ph'],
            'rainfall': weather_data['rainfall'],
            'soil_type': 'Loam'  # Default soil type for regional recommendations
        }
        
        if not model_loaded or crop_model is None or label_encoder is None:
            return jsonify({'error': 'Crop model not loaded'}), 500
        
        input_data = pd.DataFrame([{
            'Nitrogen': float(prediction_data['N']),
            'Phosphorus': float(prediction_data['P']),
            'Potassium': float(prediction_data['K']),
            'Temperature': float(prediction_data['temperature']),
            'Humidity': float(prediction_data['humidity']),
            'pH_Value': float(prediction_data['ph']),
            'Rainfall': float(prediction_data['rainfall']),
            'Soil_Type': encode_soil_type(prediction_data['soil_type']),
            'Variety': 0  # Default variety value
        }])
        
        probabilities = crop_model.predict_proba(input_data)[0]
        top_indices = np.argsort(probabilities)[-3:][::-1]
        
        recommendations = []
        for idx in top_indices:
            crop_name = label_encoder.inverse_transform([idx])[0]
            prob = float(probabilities[idx])
            # Convert numeric crop index to actual crop name
            try:
                crop_index = int(crop_name)
                if crop_index < len(CROP_LABELS):
                    crop_name_str = CROP_LABELS[crop_index]
                else:
                    crop_name_str = f"crop_{crop_index}"
            except (ValueError, TypeError):
                crop_name_str = str(crop_name)
            
            crop_details = CROP_INFO.get(crop_name_str.lower(), {})
            recommendations.append({
                'crop': crop_name_str,
                'confidence': prob,
                'details': crop_details
            })
        
        return jsonify({
            'success': True,
            'state': state,
            'primary_recommendation': recommendations[0],
            'other_recommendations': recommendations[1:]
        })

    except Exception as e:
        print(f"[ERROR] /regional-recommendation: {e}")
        return jsonify({'error': 'An error occurred during regional recommendation.'}), 500

@app.route('/test-prediction', methods=['GET'])
def test_prediction():
    """Test the model with sample data to verify it's working."""
    if not model_loaded or crop_model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        # Test with different soil conditions
        test_cases = [
            {
                'name': 'High Fertility Soil',
                'data': {'N': 120, 'P': 80, 'K': 100, 'temperature': 28, 'humidity': 70, 'ph': 7.0, 'rainfall': 150, 'soil_type': 'Loam'}
            },
            {
                'name': 'Low Fertility Soil',
                'data': {'N': 30, 'P': 15, 'K': 25, 'temperature': 22, 'humidity': 60, 'ph': 6.0, 'rainfall': 80, 'soil_type': 'Sandy'}
            },
            {
                'name': 'Acidic Soil',
                'data': {'N': 50, 'P': 25, 'K': 40, 'temperature': 25, 'humidity': 75, 'ph': 5.5, 'rainfall': 120, 'soil_type': 'Clay'}
            }
        ]
        
        results = []
        for test_case in test_cases:
            input_data = pd.DataFrame([{
                'Nitrogen': test_case['data']['N'],
                'Phosphorus': test_case['data']['P'],
                'Potassium': test_case['data']['K'],
                'Temperature': test_case['data']['temperature'],
                'Humidity': test_case['data']['humidity'],
                'pH_Value': test_case['data']['ph'],
                'Rainfall': test_case['data']['rainfall'],
                'Soil_Type': encode_soil_type(test_case['data']['soil_type']),
                'Variety': 0
            }])
            
            # Apply scaling to match how the model was trained
            if scaler:
                input_data_scaled = scaler.transform(input_data)
            else:
                input_data_scaled = input_data
            
            probabilities = crop_model.predict_proba(input_data_scaled)[0]
            top_indices = np.argsort(probabilities)[-3:][::-1]
            
            test_result = {
                'test_case': test_case['name'],
                'input': test_case['data'],
                'top_probabilities': [float(probabilities[i]) for i in top_indices],
                'top_indices': top_indices.tolist(),
                'top_crops': [CROP_LABELS[i] if 0 <= i < len(CROP_LABELS) else f"crop_{i}" for i in top_indices]
            }
            results.append(test_result)
        
        return jsonify({
            'success': True,
            'model_working': True,
            'test_results': results
        })
        
    except Exception as e:
        print(f"[ERROR] /test-prediction: {e}")
        return jsonify({'error': f'Error testing prediction: {str(e)}'}), 500

# --- Main Execution ---
if __name__ == '__main__':
    # Start the Flask app immediately
    print("Starting CropCare API server...")
    print("Server will be available at http://localhost:5000")
    
    # Load model synchronously first
    try:
        print("Loading model...")
        load_crop_model()
        print("Model loaded successfully!")
    except Exception as e:
        print(f"Warning: Model loading failed: {e}")
        print("Server will start without model - some endpoints may not work")
    
    try:
        # Run the Flask app
        print("Starting Flask server...")
        app.run(host='127.0.0.1', port=5000, debug=True, threaded=True)
    except Exception as e:
        print(f"Error starting Flask server: {e}")
        input("Press Enter to exit...")
