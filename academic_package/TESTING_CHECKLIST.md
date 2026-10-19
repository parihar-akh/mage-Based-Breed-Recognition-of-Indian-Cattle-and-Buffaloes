# Major Project Evaluation & Testing Checklist

**System:** Image-Based Breed Recognition System for Indian Cattle and Buffaloes  
**Project Verification Protocol for College Jury & Viva Evaluation**

---

## 1. Input Validation & Security Test Cases
- [x] **TC-01: Valid Format Verification (JPEG/JPG)** -> System accepts `.jpg` and previews image cleanly.
- [x] **TC-02: Valid Format Verification (PNG)** -> System accepts `.png` format with transparent or solid background.
- [x] **TC-03: Valid Format Verification (WEBP)** -> System processes modern `.webp` encoded inputs.
- [x] **TC-04: Invalid File Format Rejection** -> Uploading `.pdf`, `.txt`, `.mp4` throws friendly client-side validation error.
- [x] **TC-05: Maximum File Size Guard** -> Uploads $>20\text{MB}$ trigger file size limitation alert.
- [x] **TC-06: Corrupted File Handling** -> Partially downloaded or truncated image files are gracefully caught without crashing.

---

## 2. Model Pipeline & Rejection Safeguards
- [x] **TC-07: Cow Specimen Detection (Gir)** -> Correctly identifies Species = Cow (*Bos indicus*), Breed = Gir, confidence $> 90\%$, displays convex forehead hallmark.
- [x] **TC-08: Cow Specimen Detection (Sahiwal)** -> Correctly identifies Species = Cow, Breed = Sahiwal, displays loose dewlap & stumpy horns.
- [x] **TC-09: Cow Specimen Detection (Tharparkar)** -> Correctly identifies Species = Cow, Breed = Tharparkar, displays white-grey coat hallmark.
- [x] **TC-10: Cow Specimen Detection (Red Sindhi)** -> Correctly identifies Species = Cow, Breed = Red Sindhi, displays deep mahogany red coloration.
- [x] **TC-11: Buffalo Specimen Detection (Murrah)** -> Correctly identifies Species = Buffalo (*Bubalus bubalis*), Breed = Murrah, displays coiled spiral horns.
- [x] **TC-12: Buffalo Specimen Detection (Jaffarabadi)** -> Correctly identifies Species = Buffalo, Breed = Jaffarabadi, displays drooping flat horns and bulging poll.
- [x] **TC-13: Buffalo Specimen Detection (Nili-Ravi)** -> Correctly identifies Species = Buffalo, Breed = Nili-Ravi, displays Panch Kalyani markings & wall eyes.
- [x] **TC-14: Buffalo Specimen Detection (Mehsana)** -> Correctly identifies Species = Buffalo, Breed = Mehsana, displays sickle-shaped horns.
- [x] **TC-15: Out-of-Scope Animal Rejection (Dog)** -> Feeding a dog image triggers the safety threshold, displaying: *"Unable to identify reliably. Please upload a clearer image of an Indian cow or buffalo."*
- [x] **TC-16: Non-Animal Object Rejection (Vehicle/Furniture)** -> Triggers rejection safeguard; zero forced predictions.
- [x] **TC-17: Low-Resolution / Blurry Image** -> Triggers confidence warning and requests clearer photographic input.

---

## 3. UI/UX & Academic Deliverables
- [x] **TC-18: Navigation Integrity** -> All 5 primary pages (Home, Breed Recognition, Breed Library, About Project, Research) load instantly with zero broken routes.
- [x] **TC-19: Responsive Layout** -> UI adapts seamlessly across desktop (1440px), laptop, tablet, and mobile screens.
- [x] **TC-20: Camera Capture Feature** -> Allows users with webcams/mobile cameras to capture live livestock specimens.
- [x] **TC-21: Breed Library Filtering** -> Interactive filter controls (All, Cattle, Buffaloes) and real-time search bar function accurately.
- [x] **TC-22: One-Click Academic ZIP Download** -> Downloads complete self-contained package including Python ML scripts, FastAPI backend, documentation, and research draft.
- [x] **TC-23: Interactive Academic Document Viewers** -> Research paper, project report, presentation outline, and viva Q&A can be read on-screen during college defense.
- [x] **TC-24: Zero-Broken-Image Policy** -> All specimen cards have styled CSS/SVG fallbacks with `referrerPolicy="no-referrer"`.
