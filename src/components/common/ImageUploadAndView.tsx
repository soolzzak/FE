import { Logo } from '../../assets/svgs/Logo';
import useImageUpload from '../../hooks/useImageUpload';

export const ImageUploadAndView = ({
  roomImageUrl,
}: {
  roomImageUrl?: string;
}) => {
  const { view, handleImageChange } = useImageUpload();
  let imageSource = roomImageUrl;
  if (view) {
    imageSource = view;
  }

  return (
    <label
      htmlFor="imageInput"
      className="cursor-pointer f-jic rounded-lg object-cover shadow w-full h-full bg-primary-100 hoverAnim"
      title="Upload Image"
    >
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {imageSource ? (
        <img
          className="rounded-lg object-cover shadow w-full h-full"
          src={imageSource}
          alt=""
        />
      ) : (
        <Logo logoSize="150" />
      )}
    </label>
  );
};
