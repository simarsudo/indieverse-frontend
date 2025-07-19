import React from "react";

type Props = {
  image: File | null;
};

function SegmentationGeneratorForm({ image }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleImageClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    if (isLoading) return;

    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const normX = clickX / img.width;
    const normY = clickY / img.height;
    const origX = Math.round(normX * img.naturalWidth);
    const origY = Math.round(normY * img.naturalHeight);

    if (!image) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/get/get?x=${origX}&y=${origY}&image_name=${image.name}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        const formattedError = {
          detail: [
            {
              type: "missing",
              loc: ["query", "x"],
              msg: "Field required",
              input: null,
            },
          ],
        };
        if (formattedError.detail[0].type === "missing") {
          throw new Error(
            `Missing required field ${formattedError.detail[0].loc[1]}`
          );
        }
      }

      console.log(data);
    } catch (error) {
      alert(String(error).replace("Error: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="segmentation-generator-form">
      <h2>Image Segmentation Mask Generator 👺</h2>
      {image && (
        <div className="large-image-preview-container">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            onClick={handleImageClick}
            style={{
              filter: isLoading ? "brightness(0.5)" : "brightness(1)",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "filter 0.2s ease",
            }}
          />
        </div>
      )}
    </div>
  );
}

export { SegmentationGeneratorForm };
