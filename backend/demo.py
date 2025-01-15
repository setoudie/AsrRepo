# Testing cloudnary config
# Set your Cloudinary credentials
# ==============================
from dotenv import load_dotenv
load_dotenv()
from datetime import datetime

# Import the Cloudinary libraries
# ==============================
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api

# Import to format the JSON responses
# ==============================
import json

# Set configuration parameter: return "https" URLs by setting secure=True
# ==============================
# config = cloudinary.config(secure=True)

# Log the configuration
# ==============================
print("****1. Set up and configure the SDK:****\nCredentials: ", config.cloud_name, config.api_key, "\n")

def uploadAudio():

  # Upload the image and get its URL
  # ==============================

  uploader = cloudinary.uploader.upload(
      "temp.wav",
      asset_folder="asr_files/audio/processed",
      resource_type="video",
      public_id=f"raw_audio_{datetime.now().strftime('%Y%m%d%H%M%S')}.wav",
      overwrite=True,
      tags=["raw", "wolof", "audio"]
  )
  print("****2. Upload the audio file****\n", uploader)
  # return uploader

uploadAudio()

# print(result)