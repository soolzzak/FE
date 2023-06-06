import { useState, useRef } from 'react';
import { Modify } from '../../assets/svgs/Modify';
import { MypageProfileRooms } from '../../api/mypage';

// 얘가 원래꺼
export const MyinfoSection = ({
  myinfo,
}: {
  myinfo: MypageProfileRooms | undefined;
}) => {
  const [image, setImage] = useState<File | undefined>();

  // const [view, setView] = useState<string | undefined>();
  const [view, setView] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);

  const [modifyUserName, setmodifyUserName] = useState<string | undefined>(
    myinfo?.username
  );
  const modifyUserNameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setmodifyUserName(event.target.value);

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

  // 얘가 사진업로드
  const handleModifyClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 업로드 input 클릭
    }
  };

  const editUserInfo = (): void => {
    if (editMode) {
      setEditMode(false);
      // 저장 로직을 추가하고 원하는 동작을 수행합니다.
    } else {
      setEditMode(true);
    }
  };
  return (
    <div className="bg-[#D9D9D9] basis-2/5 h-[700px] rounded-3xl flex flex-col gap-y-6 pb-10">
      <div className="relative">
        <div className="absolute top-4 right-4 ">
          {/* <Modify onClick={} /> */}
          {editMode ? (
            <button
              className="w-[83px] h-[29px] border-2 bg-primary-50 text-primary-200 border-primary-200 rounded-2xl"
              type="button"
              onClick={editUserInfo}
            >
              저장하기
            </button>
          ) : (
            <Modify onClick={editUserInfo} />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <div
          className="transition-opacity duration-300 ease-in-out hover:opacity-70 group w-80 h-80 rounded-full bg-[#9A9A9A] mt-10 flex justify-center items-center relative"
          style={{ backgroundImage: `url(${view || myinfo?.userImageUrl})` }}
        >
          {editMode ? (
            <label
              htmlFor="imageInput"
              className="cursor-pointer f-jic rounded-full object-cover shadow bg-[#9A9A9A]"
              title="Upload Image"
            >
              <div className="invisible group-hover:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Modify />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            ''
          )}

          {view ? (
            <img
              src={view}
              alt=""
              className="w-full h-full rounded-full object-cover shadow "
            />
          ) : (
            ''
          )}
        </div>

        {editMode ? (
          <input
            className="w-[211px] h-[42px] rounded-lg border border-[#FF6700]"
            type="text"
            onChange={modifyUserNameHandler}
            value={modifyUserName}
            placeholder={myinfo?.username}
          />
        ) : (
          <p className="text-xl">{modifyUserName || myinfo?.username}</p>
        )}
      </div>
      <div className="ml-20 mt-5">
        <p className="font-bold text-lg">이메일</p>
        <p>{myinfo?.email}</p>
      </div>
      <div className="ml-20">
        <p className="font-bold text-lg">연결된 소설계정</p>
        <p>카카오톡 계정으로 연결되었습니다</p>
      </div>
    </div>
  );
};
