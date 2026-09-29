# 🔍 Resistor Scanner

An AI-powered web application that automatically detects resistor color bands from an uploaded image and predicts the resistor's **resistance value and tolerance** using deep learning.

🌐 **Live Demo:** [Resistor Scanner](https://resistor-scanner-b4uv.onrender.com)

---

## ✨ Features

* 📷 Upload a resistor image from the gallery
* 🎨 Detect resistor color bands using deep learning
* 🔢 Calculate the resistor's resistance value
* 📊 Predict resistor tolerance
* 🤖 DenseNet121-based multi-head classification model
* ⚡ TensorFlow Lite inference for deployment
* 🌐 Full-stack web application
* 📱 Works on both desktop and mobile browsers
* ☁️ Deployed application with a live backend API

---

## 🧠 How It Works

The application processes a resistor image through the following pipeline:

```text
Resistor Image
      ↓
React Frontend
      ↓
Image Upload
      ↓
Node.js / Express Backend
      ↓
Python Inference Pipeline
      ↓
TensorFlow Lite Model
      ↓
Color Band Prediction
      ↓
Resistance & Tolerance Calculation
      ↓
Result Display
```

---

## 🏗️ Project Architecture

```text
resistor-scanner/
│
├── backend/
│   ├── inference/
│   │   └── inference.py
│   ├── model/
│   │   ├── model.tflite
│   │   └── labels.json
│   ├── routes/
│   │   └── scan.js
│   ├── server.js
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CameraCapture.jsx
│   │   │   └── ResultCard.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── .gitattributes
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Axios
* HTML
* CSS

### Backend

* Node.js
* Express.js
* Multer
* CORS

### Machine Learning

* Python
* TensorFlow
* TensorFlow Lite
* Keras
* DenseNet121
* Deep Learning
* Image Classification

### Deployment

* Render
* Docker

### Version Control

* Git
* GitHub
* Git LFS

---

## 🤖 Machine Learning Model

The application uses a **DenseNet121-based deep learning model** to classify the color bands of a resistor.

The model uses a multi-head architecture to predict different resistor characteristics:

```text
Input Image
     ↓
DenseNet121 Backbone
     ↓
Global Average Pooling
     ↓
 ┌──────────┬──────────┬──────────┬────────────┬───────────┬────────────┐
 ↓          ↓          ↓          ↓            ↓           ↓
Band 1    Band 2     Band 3    Multiplier   Tolerance   Band Count
```

The predicted color bands are then mapped to their corresponding numerical values to calculate the resistor's resistance and tolerance.

The trained model is converted to **TensorFlow Lite (`.tflite`)** format for lightweight deployment and inference.

---

## 📐 Resistance Calculation

For a typical 4-band resistor, the color bands represent:

```text
Band 1 → First significant digit
Band 2 → Second significant digit
Band 3 → Multiplier
Band 4 → Tolerance
```

For example:

```text
Orange → 3
Orange → 3
Brown  → ×10
Gold   → ±5%
```

Therefore:

```text
33 × 10 = 330 Ω
Tolerance = ±5%
```

The application performs this mapping automatically after predicting the resistor bands.

---

## 📡 API

### Scan Resistor Image

```text
POST /api/scan/file
```

The endpoint accepts an image file and sends it through the machine-learning inference pipeline.

### Request

```text
Content-Type: multipart/form-data

image: <resistor image>
```

### Processing

```text
Image Upload
     ↓
Multer
     ↓
Temporary Image Storage
     ↓
Python Inference Script
     ↓
TensorFlow Lite Model
     ↓
Prediction
     ↓
JSON Response
```

The prediction result is then returned to the React frontend and displayed to the user.

---

## 💻 Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/KAVANAL1/resistor-scanner.git
cd resistor-scanner
```

### 2. Run the Backend

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available through the Vite development server.

---

## 📸 Application

### Upload Resistor Image

The user can upload a resistor image directly from the gallery.

### Prediction Result

The application displays:

* Detected resistor bands
* Resistance value
* Tolerance

Example:

```text
Bands: Orange Orange Brown Gold

Value: 330 Ω

Tolerance: 5%
```

---

## 🔄 End-to-End Workflow

```text
1. User selects a resistor image
             ↓
2. React frontend displays the image preview
             ↓
3. Image is sent to the Express API
             ↓
4. Backend temporarily stores the uploaded image
             ↓
5. Python inference script is executed
             ↓
6. TensorFlow Lite model processes the image
             ↓
7. Model predicts resistor characteristics
             ↓
8. Color values are mapped to resistance
             ↓
9. Resistance and tolerance are calculated
             ↓
10. Backend returns the result as JSON
             ↓
11. React displays the prediction
```

---

## 🚀 Deployment

The project is deployed as a full-stack application.

```text
Frontend
   ↓
React Application
   ↓
Backend API
   ↓
Node.js / Express
   ↓
Python Inference
   ↓
TensorFlow Lite Model
```

The deployed application can be accessed here:

🌐 **[Live Resistor Scanner](https://resistor-scanner-b4uv.onrender.com)**

---

## 🔮 Future Improvements

* 📷 Real-time camera-based resistor scanning
* 🎯 Improve robustness across different lighting and backgrounds
* 🔍 Automatic resistor localization before classification
* 📚 Support for additional resistor formats and band configurations
* ⚡ Further optimize inference speed
* 📊 Add prediction confidence visualization
* 🧪 Expand the evaluation dataset with more real-world images

---

## 👩‍💻 Author

**Kavana L**

Electronics & Communication Engineering student interested in **Software Development, Artificial Intelligence, Machine Learning, and Computer Vision**.

---

⭐ If you found this project interesting, consider giving the repository a star!
