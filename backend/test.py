import requests
from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup

def official_spaces():
    space_url = "https://www.library.illinois.edu/using-library-spaces/study-space-directory/"
    data = []
    try:
        response = requests.get(space_url)
        response.raise_for_status()
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        table = soup.find('table', {'id': 'tablepress-15'})
        for th in table.find_all('tr'):
            cells = th.find_all('td')
            row_data = []
            for cell in cells:
                text = cell.get_text(strip=True)
                row_data.append(text)
            try:
                data.append({
                    "Building": row_data[0],
                    "Space": row_data[1],
                    "Volume Level": row_data[2],
                    "Food & Drink": row_data[3],
                    "Maximum Occupancy": row_data[4],
                    "Reservable Rooms": row_data[5] > 0,
                    "Lighting": row_data[6],
                })
            except IndexError:
                print("Error")
    except requests.exceptions.RequestException as e:
        print(f"Error")
    return data

studyspaces_data = official_spaces()
print(studyspaces_data)

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

response = requests.get(url, params=params)
print("Status code:", response.status_code)
print("Response JSON:", response.json())

for vehicle in response.json().get("vehicles", []):
    print(vehicle['next_stop_id'])
    print(vehicle['location']['lat'])
    print(vehicle['location']['lon'])


