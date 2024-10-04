from flask import Flask, render_template, request, jsonify
import boto3  # AWS SDK for Python (for DynamoDB or other AWS services)
import os

app = Flask(__name__)

# Example configuration for AWS credentials
# Make sure to configure your AWS credentials using environment variables or AWS config file
AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
AWS_REGION = 'us-west-1'  # Change based on your AWS region

# Setup for AWS DynamoDB (if using DynamoDB)
dynamodb = boto3.resource(
    'dynamodb',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

# Your table name in DynamoDB (if using it)
TABLE_NAME = 'visionaryml_contact_data'

# Define the homepage route
@app.route('/')
def home():
    return render_template('index.html')

# Define the About page route
@app.route('/about')
def about():
    return render_template('about.html')

# Define the Contact page route
@app.route('/contact')
def contact():
    return render_template('contact.html')

# API endpoint to handle form submissions
@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # Ensure data is valid
    if not name or not email or not message:
        return jsonify({'status': 'error', 'message': 'Invalid data'}), 400

    # Store the data in AWS DynamoDB (or another database)
    try:
        table = dynamodb.Table(TABLE_NAME)
        table.put_item(
            Item={
                'name': name,
                'email': email,
                'message': message
            }
        )
        return jsonify({'status': 'success'}), 200

    except Exception as e:
        print(f"Error storing data: {e}")
        return jsonify({'status': 'error', 'message': 'Server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
