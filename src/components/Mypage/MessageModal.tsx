import { useAtom } from 'jotai';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isOpenMessageModalAtom } from '../../store/modalStore';
import { CancelButton } from '../common/CancelButton';
import { receivedMessage, sendMessage, sentMessage } from '../../api/mypage';

export const MessageModal = () => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState('받은쪽지함');
  const [username, setUsername] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
  const [, setIsOpenMessageModal] = useAtom(isOpenMessageModalAtom);
  const cancelHandler = () => {
    if (tab === '쪽지쓰기') {
      setTab('받은쪽지함');
    } else {
      setIsOpenMessageModal(false);
    }
  };

//   const { data: receivedData } = useQuery('receivedMessage', receivedMessage, {
//     refetchOnWindowFocus: false,
//   })

  const { data: sentData } = useQuery('sentMessage', sentMessage, {
    refetchOnWindowFocus: false,
  })

  
  const sendMessageMutation = useMutation(sendMessage)
  const sendMessageHandler = () => {

    if (!username || !content)
    return;

    const message = {
        receiverUsername: username,
        content,
    }
    sendMessageMutation.mutate(message);
  }

  return (
    <div className="w-[650px] h-[630px] rounded-2xl bg-white f-jic-col py-5">
      <div role="none" onClick={cancelHandler}>
        <CancelButton />
      </div>
      <div className="w-[85%] flex flex-row justify-between py-5 f-jic">
        <div>
          <div
            className={`flex flex-row gap-4 text-lg font-bold ${
              tab === '쪽지쓰기' ? 'hidden' : ''
            }`}
          >
            <div
              role="none"
              className={`${
                tab === '받은쪽지함'
                  ? 'border-b-[3px] border-primary-300 text-primary-300'
                  : ''
              } hover:cursor-pointer`}
              onClick={() => setTab('받은쪽지함')}
            >
              받은쪽지함
            </div>
            <div
              role="none"
              className={`${
                tab === '보낸쪽지함'
                  ? 'border-b-[3px] border-primary-300 text-primary-300'
                  : ''
              } hover:cursor-pointer`}
              onClick={() => setTab('보낸쪽지함')}
            >
              보낸쪽지함
            </div>
          </div>
          <div
            role="none"
            className={`${
              tab === '쪽지쓰기'
                ? 'text-primary-300 font-bold text-lg'
                : 'hidden'
            }`}
          >
            쪽지쓰기
          </div>
        </div>
        <div
          role="none"
          className={`${
            tab === '쪽지쓰기'
              ? 'hidden'
              : 'w-20 h-7 rounded-2xl bg-secondary-100 text-base font-semibold text-secondary-200 border border-secondary-200 f-jic hover:cursor-pointer hover:bg-secondary-200 hover:text-secondary-50'
          }`}
          onClick={() => {
            setTab('쪽지쓰기');
            sendMessageHandler();
        }}
        >
          쪽지쓰기
        </div>
        <div
          role="none"
          className={`${
            tab === '쪽지쓰기'
              ? 'w-20 h-7 rounded-2xl bg-secondary-100 text-base font-semibold text-secondary-200 border border-secondary-200 f-jic hover:cursor-pointer hover:bg-secondary-200 hover:text-secondary-50'
              : 'hidden'
          }`}
        >
          보내기
        </div>
      </div>

      <div className="w-[85%] h-full rounded-lg border border-[#D9D9D9] mb-7">
        <div className="flex flex-col w-full text-center h-full text-base font-semibold">
          <div className="w-full h-[7%] flex flex-row bg-[#F8F8F8] border-b-[1px] border-[#D9D9D9] mb-4">
            <p className="w-[20%] h-full border-[#D9D9D9] border-r-[1px] f-jic">
              보낸사람
            </p>
            <p className="w-[60%] h-full border-[#D9D9D9] border-r-[1px] f-jic">
              내용
            </p>
            <p className="w-[20%] h-full border-[#D9D9D9] f-jic">
              날짜
            </p>
          </div>

          <div className='w-full h-full bg-slate-100'>
            body section
          </div>
        </div>
      </div>

      받는사람<input className='border border-black'
      type='text'
      value={username || ''}
      onChange={(event) => setUsername(event.target.value)}/>
      
      내용<input className='border border-black'
      type='text'
      value={content || ''}
      onChange={(event) => setContent(event.target.value)}
      />
    </div>
  );
};
