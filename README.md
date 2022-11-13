# Face demo
Quick little demo thrown together (excuse the quality) -- only works when website is run on local server aka VSC live server extension.

## How to use?
## Python dependencies
Open console and enter in these commands:
cv2:
```
pip install opencv-python
```
## Use of python script
The python script is used to pinpoint coordinates for the javascript script to use. This is used to determine whether or not each facial feature is in the correct spot for the face to be considered "constructed".

###### Step 0: Converting an image for python script used
First, you must slice up your image into 6 images, and place them into a folder, two need to have specific names.
The nose/center should be named `nose.png`, and the full unsliced image should be named `full.png`.

###### Step 1: Plugging the image into python
Now that your images are in a folder, you'll need to change the image directory of the script.
You should look for this: `IMAGEDIRECTORY = os.path.realpath('...')` near the top
Change the text inside the single quotes to the name of the folder where your images are stored.

###### Step 2: Running the python script
Once you run the script, you should see your `full.png` pop up with a bunch of rectangles on it, verify that the rectangles are over your sliced spots, and close out.
If the rectangles don't look to be in the right spots, you'll need to reslice your image.
Go back into the folder with your images, and you should see a JSON file. You can edit the description of your images here (scroll down).

###### Step 3: Changing javascript source
Now for the final step, you'll need to open up `main.js` and look for `const source = '...';` inside the single quotes, you'll need to insert the relative directory of your folder. Boom your done!