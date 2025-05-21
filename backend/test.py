import requests
from dotenv import load_dotenv
import os

load_dotenv()

# Get Vehicles by Route
# - important to use next_stop_id from it
# - important to use location so its lat and long to track where the bus is at

api_key = os.getenv('API_KEY')
url = "https://developer.cumtd.com/api/v2.2/json/GetVehiclesByRoute"
params = {
    'key': api_key,
    'route_id': 'ILLINI'
}

print("API_KEY:", repr(api_key))

response = requests.get(url, params=params)
print("Status code:", response.status_code)
print("Response JSON:", response.json())

for vehicle in response.json().get("vehicles", []):
    print(vehicle['next_stop_id'])
    print(vehicle['location']['lat'])
    print(vehicle['location']['lon'])