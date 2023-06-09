import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { ToastContent, toast } from 'react-toastify';
import { getMainpageRooms } from '../../api/main';
import {
  displayedTabAtom,
  roomListAtom,
  searchwordAtom,
  tabAtom,
} from '../../store/mainpageStore';
import { ChatroomCard } from './ChatroomCard';
import { FilterPanel } from './FilterPanel';

export const HomeBodySection = () => {
  const [tab] = useAtom(tabAtom);
  const [displayedTab] = useAtom(displayedTabAtom);
  const [searchword] = useAtom(searchwordAtom);
  const [pageNum, setPageNum] = useState(0);
  const [chatList, setChatList] = useAtom(roomListAtom);
  const [pageableDetail, setPageableDetail] = useState<number[]>([]);
  const chatListMutation = useMutation(getMainpageRooms, {
    onSuccess: (data) => {
      if (data) {
        if (pageNum === 0) {
          setChatList([...data.data.content]);
        } else {
          setChatList((prev) => [...prev, ...data.data.content]);
        }
        setPageableDetail([data.data.number, data.data.totalPages]);
      }
    },
    onError: (error) => {
      toast.error(error as ToastContent);
    },
  });

  const debouncedHandleScroll = debounce(() => {
    const scrollPosition = window.innerHeight + window.pageYOffset;
    const documentHeight = document.documentElement.offsetHeight;
    const isNearBottom = scrollPosition > documentHeight - 500;

    if (isNearBottom) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  }, 100);

  useEffect(() => {
    if (pageNum >= pageableDetail[1]) return;
    if (pageNum !== pageableDetail[1])
      if (tab === 'SEARCH') {
        chatListMutation.mutate(`/search?page=${pageNum}&title=${searchword}`);
      } else {
        chatListMutation.mutate(
          tab === 'ALL'
            ? `/main?page=${pageNum}`
            : `/rooms?category=${tab}&page=${pageNum}`
        );
      }
  }, [pageNum]);

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  useEffect(() => {
    setPageNum(0);
    if (pageNum === pageableDetail[0]) {
      if (tab === 'SEARCH') {
        chatListMutation.mutate(`/search?title=${searchword}`);
      } else {
        chatListMutation.mutate(
          tab === 'ALL'
            ? `/main?page=${pageNum}`
            : `/rooms?category=${tab}&page=${pageNum}`
        );
      }
    }
  }, [tab, searchword]);

  return (
    <motion.section className="flex-grow w-full min-h-[100vh]">
      <div className="f-ic-col min-w-[660px]">
        <div className="px-5 w-full max-w-[1400px]">
          <div className="f-ic justify-between my-10 w-full xl:px-16">
            <p className="font-bold text-xl">{displayedTab}</p>
            <FilterPanel />
          </div>
          {!chatList?.length && <div className="f-jic"> 방이 없습니다.</div>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 h-full mb-14 mx-14 md:mx-0 xl:px-16">
            {chatList &&
              chatList.map((chatRoom) => (
                <div className="flex justify-center" key={chatRoom.roomId}>
                  <ChatroomCard chatRoom={chatRoom} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
