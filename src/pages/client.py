import requests

url = 'http://localhost:5001/Speechtotext'

# Example data to send to the server
data = {
    "language_choice": "1"  # Adjust as needed based on your server's expected input
}

try:
    response = requests.post(url, json=data)
    response_data = response.json()
    print(response_data)  # Print the server's response
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
