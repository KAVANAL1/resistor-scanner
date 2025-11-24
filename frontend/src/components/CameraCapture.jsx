// frontend/src/components/CameraCapture.jsx
import React, { useState } from "react";

function CameraCapture({ onResult, onImagePreview }) {
  const [processing, setProcessing] = useState(false);

  const handleGallery = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const previewURL = URL.createObjectURL(file);
    onImagePreview(previewURL);

    // Prepare form data
    const formData = new FormData();
    formData.append("image", file);

    setProcessing(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/scan/file`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      onResult(data);
    } catch (err) {
      console.error(err);
      alert("Error processing image.");
    }

    setProcessing(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="file"
        id="galleryInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleGallery}
      />

      <label
        htmlFor="galleryInput"
        style={{
          display: "block",
          padding: "12px",
          margin: "8px auto",
          width: "70%",
          background: "#3b82f6",
          color: "white",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        🖼️ Choose From Gallery
      </label>

      {processing && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: "#18a058",
            color: "white",
            borderRadius: 8,
          }}
        >
          Processing...
        </div>
      )}
    </div>
  );
}

export default CameraCapture;
