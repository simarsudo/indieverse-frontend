import React from "react";
import { FileInput } from "../basic/input";
import { Button } from "../basic/button";

type Props = {
  image: File | null;

  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImageUploaded: React.Dispatch<React.SetStateAction<boolean>>;
};

async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch("http://localhost:8000/post/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.detail);
  }

  return response.json();
}

async function generateMask(imageId: string) {
  const response = await fetch("http://localhost:8000/post/generate-mask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_id: imageId }),
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.detail || "Mask generation failed");
  }

  return response.json();
}

function ImageUploadForm({
  image,
  setImage,

  setImageUploaded,
}: Props) {
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image file.");
      return;
    }

    setError(null);
    setIsUploading(true);
    try {
      const { id } = await uploadImage(image);
      await generateMask(id);
      setImageUploaded(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="inputs-container">
      <h4>Upload the image file</h4>
      {image && (
        <div className="image-preview-container">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            onLoad={(e) =>
              URL.revokeObjectURL((e.target as HTMLImageElement).src)
            }
          />
        </div>
      )}

      <FileInput accept="image/*" value={image} onChange={setImage} />
      <Button isLoading={isUploading} type="submit">
        Upload
      </Button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export { ImageUploadForm };
