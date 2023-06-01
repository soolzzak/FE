import { useState, useRef } from 'react';
import { Modify } from '../../assets/svgs/Modify';

export const MyinfoSection = () => {
  const [, setImage] = useState<File | undefined>();

  const [view, setView] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setView(reader.result as string);
    };
  };

  const handleModifyClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 업로드 input 클릭
    }
  };

  return (
    <div className="bg-[#D9D9D9] basis-2/5 rounded-3xl flex flex-col gap-y-6">
      <div className="flex flex-col mt-20 justify-center items-center gap-y-6">
        <div className="relative">
          <div className="w-52 h-52 rounded-full bg-[#9A9A9A]  flex justify-center items-center">
            <div className="absolute top-2 right-3 ">
              <Modify onClick={handleModifyClick} />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              id="imageInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {view ? (
              <img
                src={view}
                alt=""
                className="w-full h-full  rounded-full object-contain shadow "
              />
            ) : (
              ''
            )}
          </div>
        </div>
        <p>곽준희</p>
      </div>
      <div className="ml-20 mt-5">
        <p className="font-bold text-lg">이메일</p>
        <p>example.naver.com</p>
      </div>
      <div className="ml-20">
        <p className="font-bold text-lg">연결된 소설계정</p>
        <p>카카오톡 계정으로 연결되었습니다</p>
      </div>
    </div>
  );
};
