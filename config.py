import os

class Config:
    AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')  # Use environment variables
    AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
    AWS_REGION = 'us-west-1'  # Change based on your AWS region
    TABLE_NAME = 'visionaryml_contact_data'  # Your DynamoDB table name