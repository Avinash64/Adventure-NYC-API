import requests
from dotenv import load_dotenv
import os
import sys
import time
time.sleep(1)
load_dotenv()
key = os.getenv('IMGUR_KEY')
filename = sys.argv[1]
image_to_upload = (f"{filename}")
url = "https://api.imgur.com/3/image"
headers = {'Authorization': f'Client-ID {key}'}
parameters = {'image': open(image_to_upload, 'rb').read()}
response = requests.post(url, headers=headers, data=parameters)
if response.status_code == 200:
    file1 = open("myfile.txt", "a")  # append mode
    file1.write(f"{response.json()['data']['link']}\n")
    file1.close()
    print('Upload successful!')
    print('Link to uploaded image:', response.json()['data']['link'])
    sys.stdout.flush()

