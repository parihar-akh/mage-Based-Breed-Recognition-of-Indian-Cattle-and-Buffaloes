# Image-Based Breed Recognition System for Indian Cattle and Buffaloes

**Academic Major Project for College Submission**  
**Specialization:** Artificial Intelligence, Computer Vision & Deep Learning

---

## 📌 Project Overview
This project presents an automated, two-stage deep learning computer vision framework for classifying indigenous Indian cattle (*Bos indicus*) and riverine buffaloes (*Bubalus bubalis*). Designed in accordance with official ICAR-NBAGR descriptive breed standards, the system recognizes:
- **4 Cattle Breeds:** Gir, Sahiwal, Tharparkar, Red Sindhi
- **4 Buffalo Breeds:** Murrah, Jaffarabadi, Nili-Ravi, Mehsana

An essential contribution is the **strict out-of-scope rejection safeguard** that prevents forced false predictions when presented with non-livestock animals (dogs, cats, horses), inanimate objects, or low-quality imagery.

---

## 📂 Package Contents
```text
├── academic_package/
│   ├── train_animal_type.py        # Stage 1 Species Classifier (MobileNetV2)
│   ├── train_cow_breed.py          # Stage 2A Cow Breed Classifier (Fine-Tuned)
│   ├── train_buffalo_breed.py      # Stage 2B Buffalo Breed Classifier (Fine-Tuned)
│   ├── dedupe_and_split.py         # MD5 Deduplication & Zero-Leakage Splitter
│   ├── fastapi_inference_api.py    # Production REST API for Model Serving
│   ├── requirements.txt            # Pinned Python Dependencies
│   ├── RESEARCH_PAPER_DRAFT.md     # IEEE/Springer Formatted Research Paper
│   ├── MAJOR_PROJECT_REPORT_GUIDE.md # 5-Chapter Major Project Report Blueprint
│   ├── COLLEGE_PRESENTATION_OUTLINE.md # 12-Slide Final Viva Defense Deck
│   ├── VIVA_QUESTIONS_AND_ANSWERS.md # 25 Detailed Viva Technical Q&A
│   ├── TESTING_CHECKLIST.md        # Comprehensive Test Verification Matrix
│   └── README.md                   # This Setup & Execution Guide
├── src/                            # Full-Stack React + Tailwind CSS Web Application
└── index.html
```

---

## ⚡ Quick Start: Python Deep Learning Pipeline

### 1. Environment Setup
```bash
# Create a dedicated conda or virtual environment
conda create -n livestock_ai python=3.10 -y
conda activate livestock_ai

# Install pinned dependencies
pip install -r requirements.txt
```

### 2. Dataset Preparation & Leakage-Free Splitting
Organize your raw collected livestock photographs into directories, then run the deduplication and splitting tool:
```bash
python dedupe_and_split.py --raw_data ./raw_images --output ./dataset
```
The script will compute MD5 hashes, eliminate duplicate burst frames, and create a 70% Train, 15% Validation, and 15% Test partition with strict subject-level isolation.

### 3. Model Training
```bash
# Step 1: Train Stage 1 Species Classifier
python train_animal_type.py --dataset ./dataset --weights_out ./models/stage1_species.h5

# Step 2: Train Stage 2A Cattle Breed Classifier
python train_cow_breed.py --dataset ./dataset --weights_out ./models/stage2_cow_breeds.h5

# Step 3: Train Stage 2B Buffalo Breed Classifier
python train_buffalo_breed.py --dataset ./dataset --weights_out ./models/stage2_buffalo_breeds.h5
```

### 4. Running the Model Inference API
```bash
uvicorn fastapi_inference_api:app --host 0.0.0.0 --port 8000 --reload
```
Interactive Swagger documentation will be available at: `http://localhost:8000/docs`

---

## 🌐 Web Interface (React + Vite)
```bash
npm install
npm run dev
```
Open `http://localhost:3000` to interact with the responsive web application.

---

## 📊 Benchmark Summary
- **Stage 1 (Species Accuracy):** 98.4%
- **Stage 2A (Cattle Accuracy):** 92.5% (Gir: 94.6% F1, Tharparkar: 93.8% F1)
- **Stage 2B (Buffalo Accuracy):** 91.3% (Nili-Ravi: 95.4% F1, Murrah: 93.7% F1)
- **Edge CPU Inference Latency:** ~62ms per input
