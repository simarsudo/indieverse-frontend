import React, { useState, useCallback, useMemo } from "react";
import { Button } from "../basic/button";

interface SegmentationGeneratorFormProps {
  image: File | null;
  imageId: string | null;
  resetApp: () => void; // <-- add this
}

interface ClickCoordinates {
  x: number;
  y: number;
}

interface MaskData {
  base64: string;
  color: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function SegmentationGeneratorForm({
  image,
  imageId,
  resetApp,
}: SegmentationGeneratorFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mask, setMask] = useState<MaskData | null>(null);
  const [showMask, setShowMask] = useState(true);

  const imageUrl = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image]
  );

  const BRIGHT_COLORS = [
    "rgba(255, 0, 0, 0.6)",
    "rgba(0, 255, 0, 0.6)",
    "rgba(0, 0, 255, 0.6)",
    "rgba(255, 255, 0, 0.6)",
    "rgba(255, 0, 255, 0.6)",
    "rgba(0, 255, 255, 0.6)",
    "rgba(255, 165, 0, 0.6)",
    "rgba(128, 0, 255, 0.6)",
    "rgba(255, 20, 147, 0.6)",
    "rgba(50, 205, 50, 0.6)",
    "rgba(255, 69, 0, 0.6)",
    "rgba(0, 191, 255, 0.6)",
  ];

  const generateRandomColor = useCallback((): string => {
    const randomIndex = Math.floor(Math.random() * BRIGHT_COLORS.length);
    return BRIGHT_COLORS[randomIndex];
  }, []);

  // Calculate click coordinates relative to the original image dimensions
  const calculateOriginalCoordinates = useCallback(
    (e: React.MouseEvent<HTMLImageElement>): ClickCoordinates => {
      const img = e.currentTarget;
      const rect = img.getBoundingClientRect();

      // Get click position relative to displayed image
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Normalize to 0-1 range based on displayed dimensions
      const normX = clickX / rect.width;
      const normY = clickY / rect.height;

      // Convert to original image coordinates
      const x = Math.round(normX * img.naturalWidth);
      const y = Math.round(normY * img.naturalHeight);

      return { x, y };
    },
    []
  );

  const fetchMask = useCallback(
    async (coordinates: ClickCoordinates) => {
      if (!imageId) {
        throw new Error("Image ID is required");
      }

      const url = new URL(`${API_BASE_URL}/get/get`);
      url.searchParams.set("x", coordinates.x.toString());
      url.searchParams.set("y", coordinates.y.toString());
      url.searchParams.set("image_id", imageId);

      const response = await fetch(url.toString(), {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.mask_png_base64;
    },
    [imageId]
  );

  const handleImageClick = useCallback(
    async (e: React.MouseEvent<HTMLImageElement>) => {
      if (isLoading || !image || !imageId) return;

      try {
        setIsLoading(true);

        const coordinates = calculateOriginalCoordinates(e);
        const maskBase64 = await fetchMask(coordinates);

        setMask({
          base64: maskBase64,
          color: generateRandomColor(),
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        alert(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [
      isLoading,
      image,
      imageId,
      calculateOriginalCoordinates,
      fetchMask,
      generateRandomColor,
    ]
  );

  React.useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  if (!image || !imageUrl) {
    return (
      <div className="segmentation-generator-form">
        <h2>Image Segmentation Mask Generator 👺</h2>
        <p>No image selected</p>
      </div>
    );
  }

  return (
    <div className="segmentation-generator-form">
      <h2>Click on the Image to Generate a Segmentation Mask</h2>
      <p>
        Select a region by clicking anywhere on the image below. A colorful mask
        will be generated and overlaid on the selected area.
      </p>

      <div
        className="large-image-preview-container"
        style={{ position: "relative" }}
      >
        <img
          src={imageUrl}
          alt="Click to generate segmentation mask"
          onClick={handleImageClick}
          style={{
            filter: isLoading ? "brightness(0.5)" : "brightness(1)",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "filter 0.2s ease",
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {mask && showMask && (
          <canvas
            ref={(canvas) => {
              if (canvas && mask) {
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const container = canvas.parentElement;
                if (container) {
                  canvas.width = container.offsetWidth;
                  canvas.height = container.offsetHeight;
                }

                const maskImg = new Image();
                maskImg.onload = () => {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);

                  ctx.globalCompositeOperation = "source-over";
                  ctx.fillStyle = mask.color;
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  ctx.globalCompositeOperation = "destination-in";
                  ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
                };
                maskImg.src = `data:image/png;base64,${mask.base64}`;
              }
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}
      </div>

      <div className="controls">
        <label className="show-mask-toggle">
          <input
            type="checkbox"
            checked={showMask}
            onChange={() => setShowMask((v) => !v)}
          />
          <span>Show Mask Overlay</span>
        </label>
        <Button isLoading={false} onClick={resetApp}>
          Reset image
        </Button>
      </div>
    </div>
  );
}

export { SegmentationGeneratorForm };
