# import the necessary packages
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import argparse
# import imutils
import time
import cv2
import os

ap = argparse.ArgumentParser()
ap.add_argument('-i', '--input', type=str, default='', help='path to input image')
args = vars(ap.parse_args())

# load our serialized face detector model from disk
prototxtPath = r"C:\Users\priyavmehta\Desktop\Flask\InOut\mask_model\face_detector\deploy.prototxt"
weightsPath = r"C:\Users\priyavmehta\Desktop\Flask\InOut\mask_model\face_detector\res10_300x300_ssd_iter_140000.caffemodel"
faceNet = cv2.dnn.readNet(prototxtPath, weightsPath)

# load the face mask detector model from disk
maskNet = load_model(r"C:\Users\priyavmehta\Desktop\Flask\InOut\mask_model\mask_detector.model")
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def detect_and_predict_mask(frame):
    	# grab the dimensions of the frame and then construct a blob
	# from it

	print(frame.shape)

	width = int(frame.shape[1])
	height = int(frame.shape[0])

	if width < 1000 or height < 1000:
		SCALE = 200
	elif (width >= 1000 and width < 2000) or (height >= 1000 and width < 2000):
		SCALE = 100
	else:
		SCALE = 60

	width = int(frame.shape[1] * SCALE / 100)
	height = int(frame.shape[0] * SCALE / 100)
	dim = (width, height)
	# resize image
	frame = cv2.resize(frame, dim, interpolation = cv2.INTER_AREA)

	gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

	total_faces = face_cascade.detectMultiScale(gray_img, 1.2, 9)
	faces = []
	locs = []
	preds = []
	for (x,y,w,h) in total_faces:
		# image = cv2.rectangle(image,(x,y),(x+w,y+h),(255,0,0),2)
		# roi_gray = gray[y:y+h, x:x+w]
		face = frame[y:y+h, x:x+w]

		# face = frame[startY:endY, startX:endX]
		face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
		face = cv2.resize(face, (224, 224))
		face = img_to_array(face)
		face = preprocess_input(face)

		faces.append(face)
		locs.append((x, y, x+w, y+h))

	print(len(faces), len(locs))

	# only make a predictions if at least one face was detected
	if len(faces) > 0:
		# for faster inference we'll make batch predictions on *all*
		# faces at the same time rather than one-by-one predictions
		# in the above `for` loop
		faces = np.array(faces, dtype="float32")
		preds = maskNet.predict(faces, batch_size=32)

	# return a 2-tuple of the face locations and their corresponding
	# locations
	return (locs, preds, frame)


# grab the frame from the threaded video stream and resize it
# to have a maximum width of 400 pixels
# image = cv2.imread(args['input'])
# image = imutils.resize(image, width=400)

# detect faces in the image and determine if they are wearing a
# face mask or not
# (locs, preds) = detect_and_predict_mask(image)

# loop over the detected face locations and their corresponding
# # locations
# for (box, pred) in zip(locs, preds):
# 	# unpack the bounding box and predictions
# 	(startX, startY, endX, endY) = box
# 	(mask, withoutMask) = pred

# 	# determine the class label and color we'll use to draw
# 	# the bounding box and text
# 	label = "Mask" if mask > withoutMask else "No Mask"
# 	color = (0, 255, 0) if label == "Mask" else (0, 0, 255)

# 	# include the probability in the label
# 	label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)

# 	# display the label and bounding box rectangle on the output
# 	# image
# 	cv2.putText(image, label, (startX, startY - 10),
# 		cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
# 	cv2.rectangle(image, (startX, startY), (endX, endY), color, 2)

# # show the output image
# cv2.imshow("image", image)
# key = cv2.waitKey(0)

# # do a bit of cleanup
# cv2.destroyAllWindows()
# vs.stop()