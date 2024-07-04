import os
import sys
import instaloader
import requests
from urllib.parse import urlparse

def download_reel_from_url(reel_url):
    L = instaloader.Instaloader()
    try:
        # Parse the URL to extract the shortcode
        parsed_url = urlparse(reel_url)
        shortcode = parsed_url.path.split('/')[-2]

        # Fetch the post using the shortcode
        post = instaloader.Post.from_shortcode(L.context, shortcode)

        # Extract video URL
        video_url = post.video_url

        # Download the video
        response = requests.get(video_url)
        if response.status_code == 200:
            # Create target directory if it doesn't exist
            target_dir = os.path.join(os.path.expanduser('~'), 'Downloads')
            os.makedirs(target_dir, exist_ok=True)
            
            # Save the video to a file
            file_path = os.path.join(target_dir, f"{shortcode}.mp4")
            with open(file_path, 'wb') as f:
                f.write(response.content)
            return file_path
        else:
            return f"Failed to download reel: {shortcode}"
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        url = sys.argv[1]
        result = download_reel_from_url(url)
        print(result)
    else:
        print("Please provide an Instagram URL")
