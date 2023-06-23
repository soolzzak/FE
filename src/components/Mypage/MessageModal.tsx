import { useAtom } from 'jotai';
import { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { DetailUserProfile, receivedMessage, sendMessage, sentMessage } from '../../api/mypage';
import { isOpenMessageModalAtom } from '../../store/modalStore';
import { CancelButton } from '../common/CancelButton';
import { currentTabAtom, tabStateAtom } from '../../store/messageStore';

export const MessageModal = ({userinfo}: {userinfo: DetailUserProfile}) => {
  const queryClient = useQueryClient();
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [tabList, setTablList] = useState({
    tab: ['받은쪽지함', '보낸쪽지함'],
    detailTab: ['쪽지쓰기', '받은쪽지', '보낸쪽지'],
  });
  const [currentTab, setCurrentTab] = useAtom(currentTabAtom)
  const [tabState, setTabState] = useAtom(tabStateAtom)
  const [username, setUsername] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
  const [detailId, setDetailId] = useState<number>();
  const [, setIsOpenMessageModal] = useAtom(isOpenMessageModalAtom);

  const cancelButton = () => {
    if (tabState === 'tab') {
      setIsOpenMessageModal(false);
    } else {
      setTabState('tab');
      setCurrentTab('받은쪽지함');
    }
  };

  console.log('userinfo', userinfo)

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const { data: sentData = [] } = useQuery('sentMessage', sentMessage, {
    refetchOnWindowFocus: false,
  });

  const { data: receivedData = [] } = useQuery(
    'receivedMessage',
    receivedMessage,
    {
      refetchOnWindowFocus: false,
    }
  );

  const sendMessageMutation = useMutation(sendMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('sentMessage');
      setUsername('');
      setContent('');
      setCurrentTab('보낸쪽지함');
      setTabState('tab');
    },
    onError: (err: any) => {
      if (err.response.data.message === 'The username does not exist.') {
        toast.error('존재하지 않는 닉네임 입니다');
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries('receivedMessage');
  }, [currentTab]);

  useEffect(() => {
    if (userinfo) {
      setUsername(userinfo.username);
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }
  },[userinfo])

  const sendMessageHandler = async () => {
    if (!username || !content) {
      toast.error('닉네임과 내용을 모두 작성해주세요');
      return;
    }
    const message = {
      receiverUsername: username,
      content,
    };
    await sendMessageMutation.mutate(message);
  };

  return (
    <div className="relative w-[450px] h-[470px] rounded-2xl bg-white f-col px-7 py-5">
      <div
        role="none"
        onClick={cancelButton}
        className="absolute -right-2 -top-2"
      >
        <CancelButton />
      </div>

      {tabState === 'tab' && (
        <>
          <div className="w-full h-fit f-ic pt-6 pb-4 justify-between">
            <div className="w-fit h-fit f-ic gap-4">
              {tabList.tab.map((list) => (
                <div
                  role="none"
                  key={list}
                  onClick={() => handleTabChange(list)}
                  className={`${
                    list === currentTab
                      ? 'messageTabSelected'
                      : 'messageTabUnselected'
                  }`}
                >
                  {list}
                </div>
              ))}
            </div>
            <div
              role="none"
              className="w-fit h-fit font-semibold text-secondary-200 border border-secondary-200 bg-secondary-50 px-3 py-1 rounded-2xl cursor-pointer"
              onClick={() => {
                setCurrentTab('쪽지쓰기');
                setTabState('detailTab');
              }}
            >
              쪽지쓰기
            </div>
          </div>

          <div className="w-full h-[350px] border border-[#D9D9D9] rounded-lg f-col text-center font-semibold text-base">
            <div className="w-full h-fit flex border-b py-1">
              <div className="w-1/4 h-fit border-r">
                {currentTab === '받은쪽지함' ? '보낸사람' : '받는사람'}
              </div>
              <div className="w-1/2 h-fit border-r">내용</div>
              <div className="w-1/4 h-fit">날짜</div>
            </div>

            <div className="w-full h-fit flex-col py-1 overflow-y-scroll">
              {currentTab === '받은쪽지함' &&
                receivedData.map((list, index) => (
                  <div
                    role="none"
                    key={list.messageId}
                    onClick={async () => {
                      await setDetailId(index);
                      setCurrentTab('받은쪽지');
                      setTabState('detailTab');
                    }}
                    className="w-full flex items-center h-fit py-1 text-sm cursor-pointer"
                  >
                    <div className="w-1/4 h-fit overflow-hidden truncate">
                      {list.senderUsername}
                    </div>
                    <div className="w-1/2 h-fit text-left indent-7 overflow-hidden truncate">
                      {list.content}
                    </div>
                    <div className="w-1/4 h-fit overflow-hidden indent-8 truncate">
                      {new Date(list.createdAt)
                        .toLocaleDateString()
                        .substring(2)}
                    </div>
                  </div>
                ))}

              {currentTab === '보낸쪽지함' &&
                sentData.map((list, index) => (
                  <div
                    role="none"
                    key={list.messageId}
                    onClick={async () => {
                      await setDetailId(index);
                      setCurrentTab('보낸쪽지');
                      setTabState('detailTab');
                    }}
                    className="w-full flex items-center h-fit py-1 text-sm cursor-pointer"
                  >
                    <div className="w-1/4 h-fit overflow-hidden truncate">
                      {list.receiverUsername}
                    </div>
                    <div className="w-1/2 h-fit text-left indent-7 overflow-hidden truncate">
                      {list.content}
                    </div>
                    <div className="w-1/4 h-fit overflow-hidden indent-8 truncate">
                      {new Date(list.createdAt)
                        .toLocaleDateString()
                        .substring(2)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      {tabState === 'detailTab' &&
        tabList.detailTab.map(
          (list) =>
            list === currentTab && (
              <div
                key={list}
                className="w-full h-fit f-ic pt-6 pb-4 justify-between"
              >
                <div className="w-fit h-fit f-ic gap-4">
                  <div className="text-lg font-bold text-primary-300">
                    {currentTab}
                  </div>
                </div>
              </div>
            )
        )}

      {currentTab === '쪽지쓰기' && (
        <div className="relative w-full h-full f-jic-col">
          <button
            type="button"
            onClick={() => {
              sendMessageHandler();
            }}
            className="absolute -top-12 right-1.5 w-fit h-fit font-semibold text-secondary-200 border border-secondary-200 bg-secondary-50 px-3 py-1 rounded-2xl cursor-pointer"
          >
            보내기
          </button>
          <div className="w-full min-h-fit flex">
            <div className="font-semibold min-w-fit py-1.5 pr-2">받는사람</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="닉네임을 입력하세요."
              maxLength={20}
              className="w-full border indent-2 rounded-lg placeholder:indent-2 py-1.5"
            />
          </div>
          <textarea
            ref={textAreaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="150자 이내로 작성해주세요."
            className="w-full h-full rounded-lg mt-3 px-2 py-2"
            style={{ border: '1px solid #D9D9D9' }}
            maxLength={150}
          />

          <div className="font-medium text-[#AAAAAA] self-start pl-2">
            {content && content.length}/150자
          </div>
        </div>
      )}

      {currentTab === '보낸쪽지' && (
        <div className="w-full h-full f-jic-col">
          <div className="w-full min-h-fit flex items-center justify-center pb-4">
            <div className="w-2/3 h-full f-jic gap-4">
              <div className="w-1/3 h-full f-jic font-semibold">받은사람</div>
              <div className="border w-full h-fit rounded-lg py-2 indent-2">
                {detailId !== undefined && sentData[detailId].receiverUsername}
              </div>
            </div>
            <div className="w-1/3 h-full f-ic justify-end gap-4">
              <span className="w-fit h-full f-jic font-semibold">날짜</span>
              <div className="w-fit h-full f-jic font-semibold">
                {detailId !== undefined &&
                  new Date(sentData[detailId].createdAt)
                    .toLocaleDateString()
                    .substring(2)}
              </div>
            </div>
          </div>
          <div className="w-full h-full border font-semibold rounded-lg py-2 px-2">
            {detailId !== undefined && sentData[detailId].content}
          </div>
        </div>
      )}

      {currentTab === '받은쪽지' && (
        <div className="w-full h-full f-jic-col">
          <div className="w-full min-h-fit flex items-center justify-center pb-4">
            <div className="w-2/3 h-full f-jic gap-4">
              <div className="w-1/3 h-full f-jic font-semibold">보낸사람</div>
              <div className="border w-full h-fit rounded-lg py-2 indent-2">
                {detailId !== undefined &&
                  receivedData[detailId].senderUsername}
              </div>
            </div>
            <div className="w-1/3 h-full f-ic justify-end gap-4">
              <span className="w-fit h-full f-jic font-semibold">날짜</span>
              <div className="w-fit h-full f-jic font-semibold">
                {detailId !== undefined &&
                  new Date(receivedData[detailId].createdAt)
                    .toLocaleDateString()
                    .substring(2)}
              </div>
            </div>
          </div>
          <div className="w-full h-full border font-semibold rounded-lg py-2 px-2">
            {detailId !== undefined && receivedData[detailId].content}
          </div>
        </div>
      )}
    </div>
  );
};
