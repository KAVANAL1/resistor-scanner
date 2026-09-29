# 🔍 Resistor Scanner

An AI-powered web application that automatically detects resistor color bands from an uploaded image and predicts the resistor's **resistance value and tolerance**.

## 🚀 Live Demo

👉 **[Try Resistor Scanner](https://resistor-scanner.vercel.app/)**

## ✨ Features

* 📷 Upload a resistor image from the gallery
* 🎨 Detect resistor color bands using deep learning
* 🔢 Predict resistor resistance value
* 📊 Predict tolerance
* ⚡ Fast image processing through a web interface
* 🌐 Full-stack application with React frontend and Node.js backend
* 🤖 TensorFlow/TFLite-based model inference

## 🧠 How It Works

The application follows this workflow:

```text
Resistor Image
      ↓
React Frontend
      ↓
Image Upload
      ↓
Node.js / Express Backend
      ↓
ML Model Inference
      ↓
Color Band Detection
      ↓
Resistance & Tolerance Calculation
      ↓
Result Display
```

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

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Axios
* HTML/CSS

### Backend

* Node.js
* Express.js
* Multer
* CORS

### Machine Learning

* TensorFlow
* TensorFlow Lite
* Deep Learning
* Image Classification

### Deployment

* Vercel – Frontend
* Render – Backend

### Version Control

* Git
* GitHub
* Git LFS

## 🤖 Machine Learning Model

The application uses a deep-learning model trained to identify resistor color bands from images.

The model predicts the required resistor characteristics, which are then used to determine the corresponding resistance value and tolerance.

The trained model is converted to **TensorFlow Lite (`.tflite`)** format for deployment.

## 📡 API

### Scan Resistor Image

```http
POST /api/scan/file
```

The endpoint accepts an image file and processes it using the machine-learning inference pipeline.

### Request

```text
Content-Type: multipart/form-data

image: <resistor image>
```

### Response

The backend returns the prediction result, which is displayed by the React frontend.

## 💻 Run Locally

### 1. Clone the repository

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

## 📸 Application

### Upload Resistor Image

*Add a screenshot of the image upload interface here.*

### Prediction Result

*Add a screenshot of the prediction result here.*

## 📊 Example Workflow

```text
1. User uploads resistor image
          ↓
2. Frontend sends image to backend
          ↓
3. Backend processes the image
          ↓
4. ML model predicts resistor bands
          ↓
5. Resistance and tolerance are calculated
          ↓
6. Result is returned to frontend
          ↓
7. Prediction is displayed to user
```

## 🔮 Future Improvements

* 📷 Real-time camera-based resistor scanning
* 🎯 Improved detection accuracy
* 📱 Mobile-friendly interface
* ⚡ Faster model inference
* 🔍 Automatic resistor localization before classification
* 📚 Support for additional resistor types
* ☁️ Improved cloud deployment and scalability

## 👩‍💻 Author

**Kavana L**

Electronics & Communication Engineering
Interested in Software Development, AI/ML and Computer Vision.

---

⭐ If you found this project interesting, consider giving the repository a star!
