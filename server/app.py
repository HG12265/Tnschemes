from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import requests
import json

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = "Dummy_key"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={GEMINI_API_KEY}"

# Database Setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tnschemes.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({"message": "Backend Connected!"})

# Register Route
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    hashed_pw = generate_password_hash(data['password'], method='pbkdf2:sha256')
    
    new_user = User(username=data['username'], email=data['email'], password=hashed_pw)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except:
        return jsonify({"message": "User already exists!"}), 400

# Login Route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful!", "username": user.username}), 200
    
    return jsonify({"message": "Invalid credentials!"}), 401

@app.route('/api/match-schemes', methods=['POST'])
def match_schemes():
    user_data = request.json
    category = user_data.get('category')
    details = user_data.get('details')

    # Convert details dict to string for the prompt
    details_str = json.dumps(details)

    prompt = f"""
    You are an expert advisor for Tamil Nadu Government Welfare Schemes. 
    Analyze the following user profile and list the top 5 REAL official schemes from TN Government they are eligible for.

    User Category: {category}
    User Details: {details_str}

    Strict Rules:
    1. Suggest ONLY official schemes from the Government of Tamil Nadu.
    2. Provide: Name, Brief Benefit, and Match Percentage.
    3. Return ONLY a valid JSON array of objects.
    Example Format: 
    [
      {{"name": "Scheme Name", "benefit": "Short description", "match": "95%"}}
    ]
    """

    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    try:
        response = requests.post(GEMINI_URL, json=payload)
        response_data = response.json()
        
        # AI response text-ah extract panrom
        ai_text = response_data['candidates'][0]['content']['parts'][0]['text']
        
        # JSON-ah clean panna (AI sila neram ```json ... ``` nu anuppum)
        clean_json = ai_text.replace('```json', '').replace('```', '').strip()
        
        return clean_json, 200, {'Content-Type': 'application/json'}
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "AI Connection Failed"}), 500

# app.py kulla intha route-ah add pannunga

@app.route('/api/scheme-details', methods=['POST'])
def get_scheme_details():
    try:
        data = request.json
        scheme_name = data.get('scheme_name')

        prompt = f"""
        Provide a detailed "How to Apply" guide for the Tamil Nadu Government scheme: "{scheme_name}".
        
        Include the following sections:
        1. Required Documents (list format)
        2. Application Process (Step-by-step)
        3. Official Website Link (if any)
        4. Offline Method (e.g., CSC Center, VAO office)

        Keep the tone professional and helpful. Use clear headings.
        """

        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }

        response = requests.post(GEMINI_URL, json=payload)
        response_data = response.json()
        ai_text = response_data['candidates'][0]['content']['parts'][0]['text']
        
        return jsonify({"details": ai_text}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)