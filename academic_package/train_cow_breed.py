"""
Image-Based Breed Recognition System for Indian Cattle and Buffaloes
Script 2: Stage 2A Cow Breed Classifier (Gir, Sahiwal, Tharparkar, Red Sindhi)
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

COW_CLASSES = ['Gir', 'Sahiwal', 'Tharparkar', 'Red_Sindhi']
IMG_HEIGHT, IMG_WIDTH = 224, 224
BATCH_SIZE = 32
EPOCHS = 35

def build_cow_breed_model(num_classes=4):
    base_model = MobileNetV2(
        weights='imagenet',
        include_top=False,
        input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)
    )
    # Fine-tuning: Unfreeze top 30 layers of MobileNetV2 to capture subtle horn/ear/dewlap features
    base_model.trainable = True
    for layer in base_model.layers[:-30]:
        layer.trainable = False

    x = base_model.output
    x = GlobalAveragePooling2D(name='global_avg_pool')(x)
    x = BatchNormalization()(x)
    x = Dense(384, activation='relu', name='dense_384')(x)
    x = Dropout(0.45, name='dropout_045')(x)
    x = Dense(128, activation='relu', name='dense_128')(x)
    x = Dropout(0.3, name='dropout_03')(x)
    outputs = Dense(num_classes, activation='softmax', name='cow_breed_prediction')(x)

    model = Model(inputs=base_model.input, outputs=outputs, name='Stage2A_Cow_Breed_Classifier')
    return model

def main():
    parser = argparse.ArgumentParser(description="Train Stage 2A Cow Breed Classifier")
    parser.add_argument('--dataset', type=str, default='dataset', help='Path to dataset directory')
    parser.add_argument('--weights_out', type=str, default='models/stage2_cow_breeds_mobilenetv2.h5', help='Output model path')
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.weights_out), exist_ok=True)
    print(f"[*] Training Cow Breed Classifier for classes: {COW_CLASSES}")
    model = build_cow_breed_model(len(COW_CLASSES))
    model.compile(
        optimizer=Adam(learning_rate=8e-5),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    model.summary()

if __name__ == '__main__':
    main()
