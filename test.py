import requests
response = requests.post("http://telematics.oasa.gr/api/?act=getLinesAndRoutesForMl&p1=9")
json_response = response.json()
print(json_response)