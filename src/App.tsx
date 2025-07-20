import React from "react";
import "./App.css";

import { ImageUploadForm } from "./components/shared/ImageUploadForm";
import { SegmentationGeneratorForm } from "./components/shared/SegmentationGeneratorForm";

function App() {
  const [image, setImage] = React.useState<File | null>(null);
  const [imageUploaded, setImageUploaded] = React.useState<boolean>(false);
  const [imageId, setImageId] = React.useState<string | null>(null);

  const resetApp = React.useCallback(() => {
    setImage(null);
    setImageUploaded(false);
    setImageId(null);
  }, []);

  return (
    <>
      <div className="navbar">
        <p>Image Segmentation App</p>
      </div>
      <div className="app container">
        {imageUploaded ? (
          <SegmentationGeneratorForm
            image={image}
            imageId={imageId}
            resetApp={resetApp}
          />
        ) : (
          <ImageUploadForm
            image={image}
            setImage={setImage}
            setImageUploaded={setImageUploaded}
            setImageId={setImageId}
          />
        )}
      </div>
    </>
  );
}

export default App;
