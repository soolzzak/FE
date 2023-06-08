import imageCompression from 'browser-image-compression';

export const handleImageCompression = async (imageFile: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 900,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    return error;
  }
};
