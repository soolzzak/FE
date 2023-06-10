import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import {
  MypageProfileRooms,
  UpdateMypageData,
  updateMypageProfile,
} from '../../api/mypage';
import { Modify } from '../../assets/svgs/Modify';

// 얘가 원래꺼
export const MyinfoSection = ({ myinfo }: { myinfo: MypageProfileRooms }) => {
  const [image, setImage] = useState<File | undefined>();

  console.log(myinfo.userImageUrl);

  // const [view, setView] = useState<string | undefined>();
  const [view, setView] = useState<string | undefined>(myinfo.userImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);

  const [modifyUserName, setmodifyUserName] = useState<string | undefined>(
    myinfo?.username
  );
  const modifyUserNameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setmodifyUserName(event.target.value);

  // 수정 ,,,
  const updateMyProfileMutation = useMutation(updateMypageProfile);

  const submitHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const updateMypageData: UpdateMypageData = {
      userImage: image || null,
      username: modifyUserName || '',
    };
    await updateMyProfileMutation.mutate(updateMypageData);
    setEditMode(!editMode);
  };

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
    <div className="bg-[#ffffff] basis-2/5 h-[700px] rounded-3xl flex flex-col gap-y-6 pb-10 shadow">
      <div className="relative">
        <div className="absolute top-4 right-4 ">
          {editMode ? (
            <button
              className="w-[83px] h-[29px] border-2 bg-primary-50 text-primary-200 border-primary-200 rounded-2xl"
              type="button"
              onClick={submitHandler}
            >
              저장하기
            </button>
          ) : (
            <Modify onClick={editUserInfo} />
          )}
        </div>
      </div>
      <div className="flex md:flex-col flex-row gap-y-6">
        <div className="flex justify-center items-center">
          <div
            className={`${
              editMode ? 'group hover:opacity-70' : ''
            }  transition-opacity duration-300 ease-in-out 
            lg:w-80 lg:h-80 lg:mt-10 md:w-60 md:h-60 sm:w-40 sm:h-40 w-[84px] h-[84px] ml-5 mr-5 rounded-full 
            bg-[#B6ECC4] mt-5 flex justify-center items-center relative shadow`}
          >
            {editMode ? (
              <label
                htmlFor="imageInput"
                className="  cursor-pointer f-jic rounded-full object-cover shadow bg-[#B6ECC4]"
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
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="md:flex-row flex-col md:block f-jc">
          <div className="flex md:justify-center md:mb-10 items-center md:flex md:items-start">
            {editMode ? (
              <input
                className="w-[211px] h-[32px] rounded-lg border border-[#FF6700]"
                type="text"
                onChange={modifyUserNameHandler}
                value={modifyUserName}
                placeholder={myinfo?.username}
              />
            ) : (
              <p className="text-xl font-bold">
                {modifyUserName || myinfo?.username}
              </p>
            )}
          </div>

          <div className="flex flex-col md:ml-20">
            <p className="font-bold text-lg text-[#7C7C7C] hidden sm:block">
              이메일
            </p>
            <p className="font-normal">{myinfo?.email}</p>
          </div>
        </div>
      </div>
      <div className="md:ml-20 ml-5">
        <p className="font-bold text-lg text-[#7C7C7C]">연결된 소셜계정</p>

        <p>카카오톡 계정으로 연결되었습니다</p>
      </div>
    </div>
  );
};
