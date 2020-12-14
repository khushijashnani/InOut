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
from mtcnn import MTCNN

detector = MTCNN()

ap = argparse.ArgumentParser()
ap.add_argument('-i', '--input', type=str, default='',
                help='path to input image')
args = vars(ap.parse_args())

# load our serialized face detector model from disk
# prototxtPath = r"C:\Users\priyavmehta\Desktop\Flask\InOut\mask_model\face_detector\deploy.prototxt"
# weightsPath = r"C:\Users\priyavmehta\Desktop\Flask\InOut\mask_model\face_detector\res10_300x300_ssd_iter_140000.caffemodel"
# faceNet = cv2.dnn.readNet(prototxtPath, weightsPath)


# load the face mask detector model from disk
maskNetPath = os.path.join(os.getcwd() + '\\mask_detector.model')
print(maskNetPath)
# maskNet = load_model(
#     r"/Users/priyavmehta/Desktop/Flask/InOut/mask_model/mask_detector.model")
maskNet = load_model(maskNetPath)

print(os.getcwd())
# face_cascade = cv2.CascadeClassifier(
#     r'/Users/rishikaul/Desktop/InOut/mask_model/haarcascade_frontalface_default.xml')


def detect_and_predict_mask(frame):

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
    frame = cv2.resize(frame, dim, interpolation=cv2.INTER_AREA)

    # gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # total_faces = face_cascade.detectMultiScale(gray_img, 1.2, 9)
    total_faces = detector.detect_faces(frame)
    faces = []
    locs = []
    preds = []
    # for (x, y, w, h) in total_faces:
    for result in total_faces:
        # image = cv2.rectangle(image,(x,y),(x+w,y+h),(255,0,0),2)
        # roi_gray = gray[y:y+h, x:x+w]
        x,y,w,h = result['box']
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
    return (locs, preds)

