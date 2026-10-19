"""
Image-Based Breed Recognition System for Indian Cattle and Buffaloes
Script 1: Stage 1 Species Classifier (Cow vs Buffalo vs Out-of-Scope)
Author: Major Project Team
Framework: PyTorch / Torchvision & TensorFlow MobileNetV2 compatible
"""

import os
import sys
import argparse
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, BatchNormalization
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from sklearn.metrics import classification_report, confusion_matrix

IMG_HEIGHT, IMG_WIDTH = 224, 224
BATCH_SIZE = 32
EPOCHS = 25
LEARNING_RATE = 1e-4

def build_stage1_species_model(input_shape=(224, 224, 3)):
    """
    Builds Stage 1 Species Model using MobileNetV2 backbone pretrained on ImageNet.
    Features:
      - Inverted residual bottlenecks
      - Depthwise separable convolutions (computationally lightweight for rural deployment)
    """
    base_model = MobileNetV2(
        weights='imagenet',
        include_top=False,
        input_shape=input_shape
    )
    # Freeze base model for initial warm-up phase
    base_model.trainable = False

    x = base_model.output
    x = GlobalAveragePooling2D(name='global_avg_pool')(x)
    x = BatchNormalization()(x)
    x = Dense(256, activation='relu', name='dense_256')(x)
    x = Dropout(0.4, name='dropout_04')(x)
    
    # 2 classes: cow, buffalo (with softmax)
    outputs = Dense(2, activation='softmax', name='species_prediction')(x)

    model = Model(inputs=base_model.input, outputs=outputs, name='Stage1_Species_MobileNetV2')
    return model, base_model

def get_data_generators(dataset_dir):
    train_dir = os.path.join(dataset_dir, 'animal_type', 'train')
    val_dir = os.path.join(dataset_dir, 'animal_type', 'validation')
    test_dir = os.path.join(dataset_dir, 'animal_type', 'test')

    train_datagen = ImageDataGenerator(
        rescale=1.0 / 255.0,
        rotation_range=25,
        width_shift_range=0.15,
        height_shift_range=0.15,
        shear_range=0.15,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )

    test_val_datagen = ImageDataGenerator(rescale=1.0 / 255.0)

    train_gen = train_datagen.flow_from_directory(
        train_dir,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=True
    )

    val_gen = test_val_datagen.flow_from_directory(
        val_dir,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )

    test_gen = test_val_datagen.flow_from_directory(
        test_dir,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )

    return train_gen, val_gen, test_gen

def main():
    parser = argparse.ArgumentParser(description="Train Stage 1 Species Classifier")
    parser.add_argument('--dataset', type=str, default='dataset', help='Path to dataset directory')
    parser.add_argument('--weights_out', type=str, default='models/stage1_species_mobilenetv2.h5', help='Output model path')
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.weights_out), exist_ok=True)
    print(f"[*] Preparing Stage 1 Species Classifier training using: {args.dataset}")

    model, base_model = build_stage1_species_model()
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    model.summary()

    callbacks = [
        ModelCheckpoint(args.weights_out, monitor='val_accuracy', save_best_only=True, verbose=1),
        EarlyStopping(monitor='val_loss', patience=6, restore_best_weights=True, verbose=1),
        ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3, min_lr=1e-6, verbose=1)
    ]

    print("[*] Training pipeline initialized. Load data via generators and run model.fit().")

if __name__ == '__main__':
    main()
