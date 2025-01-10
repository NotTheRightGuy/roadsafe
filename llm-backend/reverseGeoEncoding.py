import requests

def reverseGeoEncoding(latitude, longitude):
  url = f"https://api.olamaps.io/places/v1/reverse-geocode?latlng={latitude},{longitude}&api_key=pHQXmsEPbAUtk9xudUsWl5TUI28v55RknfVLGP7p"
  response = requests.get(url)
  data = response.json()
  return data['results'][0]['formatted_address']
