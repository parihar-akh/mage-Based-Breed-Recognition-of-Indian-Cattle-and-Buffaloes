"""
Image-Based Breed Recognition System for Indian Cattle and Buffaloes
Script 3: Stage 2B Buffalo Breed Classifier (Murrah, Jaffarabadi, Nili-Ravi, Mehsana)
Author: Major Project Team
Framework: TensorFlow Keras MobileNetV2 with Fine-Tuning
"""

import os
import argparse
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, BatchNormalization
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau

BUFFALO_CLASSES = ['Murrah', 'Jaffarabadi', 'Nili_Ravi', 'Mehsana']
IMG_HEIGHT, IMG_WIDTH = 224, 224
BATCH_SIZE = 32
EPOCHS = 35

def build_buffalo_breed_model(num_classes=4):
    base_model = MobileNetV2(
        weights='imagenet',
        include_top=False,
        input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)
    )
    # Buffalo phenotypic distinctions heavily depend on horn curvature (coiled vs flat drooping vs sickle)
    # and facial markings (Panch Kalyani). Unfreezing top 35 layers captures these distinct spatial patterns.
    base_model.trainable = True
    for layer in base_model.layers[:-35]:
        layer.trainable = False

    x = base_model.output
    x = GlobalAveragePooling2D(name='global_avg_pool')(x)
    x = BatchNormalization()(x)
    x = Dense(384, activation='relu', name='dense_384')(x)
    x = Dropout(0.45, name='dropout_045')(x)
    x = Dense(128, activation='relu', name='dense_128')(x)
    x = Dropout(0.3, name='dropout_03')(x)
    outputs = Dense(num_classes, activation='softmax', name='buffalo_breed_prediction')(x)

    model = Model(inputs=base_model.input, outputs=outputs, name='Stage2B_Buffalo_Breed_Classifier')
    return model

def main():
    parser = argparse.ArgumentParser(description="Train Stage 2B Buffalo Breed Classifier")
    parser.add_argument('--dataset', type=str, default='dataset', help='Path to dataset directory')
    parser.add_argument('--weights_out', type=str, default='models/stage2_buffalo_breeds_mobilenetv2.h5', help='Output model path')
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.weights_out), exist_ok=True)
    print(f"[*] Training Buffalo Breed Classifier for classes: {BUFFALO_CLASSES}")
    model = build_buffalo_breed_model(len(BUFFALO_CLASSES))
    model.compile(
        optimizer=Adam(learning_rate=8e-5),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    model.summary()

if __name__ == '__main__':
    main()
