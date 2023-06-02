import { Logo } from '../../assets/svgs/Logo';
import useImageUpload from '../../hooks/useImageUpload';

export const ImageUploadAndView = () => {
  const { view, handleImageChange } = useImageUpload();
  return (
    <label
      htmlFor="imageInput"
      className="cursor-pointer f-jic rounded-lg object-cover shadow w-full h-full bg-primary-100 hoverAnim"
      title="Upload Image"
    >
      <Logo logoSize="150" />
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      {view ? (
        <img
          className="rounded-lg object-cover shadow w-full h-full "
          src={view}
          alt=""
        />
      ) : (
        ''
      )}
    </label>
  );
};
