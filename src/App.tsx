import React from "react";
import "./App.css";

import { ImageUploadForm } from "./components/shared/ImageUploadForm";
import { SegmentationGeneratorForm } from "./components/shared/SegmentationGeneratorForm";

function App() {
  const [image, setImage] = React.useState<File | null>(null);
  const [imageUploaded, setImageUploaded] = React.useState<boolean>(false);

  return (
    <div className="app container">
      {imageUploaded ? (
        <SegmentationGeneratorForm image={image} />
      ) : (
        <ImageUploadForm
          image={image}
          setImage={setImage}
          setImageUploaded={setImageUploaded}
        />
      )}
    </div>
  );
}

export default App;
