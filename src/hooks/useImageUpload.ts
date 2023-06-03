import { useState } from 'react';

const useImageUpload = () => {
  const [image, setImage] = useState<File | undefined>();
  const [view, setView] = useState<string | undefined>();

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    const fileType = file?.type.split('/')[0];

    // ----------- Image validation -------------
    if (!file) return;
    if (fileType !== 'image') {
      alert('The selected file is not an image.');
      return;
    }
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size is too large. Please select a file under 3 MB.');
      return;
    }
    // ---------------------------------------

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setView(reader.result as string);
    };
  };

  return {
    image,
    view,
    handleImageChange,
  };
};

export default useImageUpload;
