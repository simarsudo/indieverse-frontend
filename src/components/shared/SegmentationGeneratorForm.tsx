type Props = {
  image: File | null;
};

function SegmentationGeneratorForm({ image }: Props) {
  const handleImageClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const normX = clickX / img.width;
    const normY = clickY / img.height;
    const origX = Math.round(normX * img.naturalWidth);
    const origY = Math.round(normY * img.naturalHeight);

    if (!image) return;

    try {
      const response = await fetch(
        `http://localhost:8000/get/get?x=${origX}&y=${origY}&image_name=${image.name}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send coordinates");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Error sending coordinates:", error);
    }
  };

  return (
    <div className="segmentation-generator-form">
      <h2>Segmentation masks generator 👺</h2>
      {image && (
        <div className="large-image-preview-container">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            onClick={handleImageClick}
          />
        </div>
      )}
    </div>
  );
}

export { SegmentationGeneratorForm };
