# script to locate indivdual features and return coordinates
import cv2  # pip install opencv-python
import os
from os import listdir
import json

METHOD = cv2.TM_SQDIFF_NORMED
IMAGEDIRECTORY = os.path.realpath('test face 1')
images = {}

# collect and read images
for image in os.listdir(IMAGEDIRECTORY):
    if (image.endswith('.png')):
        image_file = image
        image_data = cv2.imread(f'{IMAGEDIRECTORY}\{image}')
        images[image_file] = image_data

if 'full.png' in images.keys():
    index = 0
    jsonDict, relativePos, absolutePos = {}, {}, {}
    
    for image in images.keys():
        if image != 'full.png':
            index += 1
            result = cv2.matchTemplate(images[image], images['full.png'], METHOD)
            
            # we just want minimum diffrence
            mn, _, mnLoc, _ = cv2.minMaxLoc(result)
            # extracting coordinates of best match
            MPx, MPy = mnLoc
            # getting sizes
            trows, tcols = images[image].shape[:2]
            
            # drawing rectangles on full.png
            cv2.rectangle(images['full.png'], (MPx, MPy), (MPx+tcols,MPy+trows),(255,0+(index*45),0+(index*22)),1)
            
            absolutePos[image] = (MPx+(tcols/2)), (MPy+(trows/2))
    
    # nose is the "center" of the face
    anchorX, anchorY = absolutePos['nose.png']
    
    for image in absolutePos.keys():
        x, y = absolutePos[image]
        relativeCoords = (x - anchorX), (y - anchorY)
        relativePos[image] = relativeCoords
    
    jsonDict['absolutePos'] = absolutePos
    jsonDict['relativePos'] = relativePos
    
    # write to json file so that JS script can access info
    json_obj = json.dumps(jsonDict, indent=4)
    with open(f'{IMAGEDIRECTORY}\image_data.json', 'w') as outfile:
        outfile.write(json_obj)
else:
    # reduntant
    raise KeyError('Need a full image to operate')

if __name__ == '__main__':
    # display image
    cv2.imshow('output', images['full.png'])
    # image only shows up if this is called
    cv2.waitKey(0)