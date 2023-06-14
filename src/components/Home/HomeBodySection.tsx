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
  searchwordTriggerAtom,
  tabAtom,
} from '../../store/mainpageStore';
import { ChatroomCard } from './ChatroomCard';
import { FilterPanel } from './FilterPanel';
import {
  genderFilterAtom,
  isEmptyFilterAtom,
} from '../../store/filterPanelStore';
import { NoRoom } from './NoRoom';
import { BackToTop } from '../../assets/svgs/BackToTop';

export const HomeBodySection = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [tab] = useAtom(tabAtom);
  const [displayedTab] = useAtom(displayedTabAtom);
  const [genderFilter] = useAtom(genderFilterAtom);
  const [emptyRoomFilter] = useAtom(isEmptyFilterAtom);

  const [searchword] = useAtom(searchwordAtom);
  const [newSearchwordTrigger] = useAtom(searchwordTriggerAtom);

  const [chatList, setChatList] = useAtom(roomListAtom);
  const [pageNum, setPageNum] = useState(0);
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
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 500);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            ? `/main?genderSetting=${genderFilter}&roomCapacityCheck=${emptyRoomFilter}&page=${pageNum}`
            : `/rooms?category=${tab}&genderSetting=${genderFilter}&roomCapacityCheck=${emptyRoomFilter}&page=${pageNum}`
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
            ? `/main?genderSetting=${genderFilter}&roomCapacityCheck=${emptyRoomFilter}&page=${pageNum}`
            : `/rooms?category=${tab}&genderSetting=${genderFilter}&roomCapacityCheck=${emptyRoomFilter}&page=${pageNum}`
        );
      }
    }
  }, [tab, newSearchwordTrigger, genderFilter, emptyRoomFilter]);

  return (
    <section className="flex-grow w-full min-h-[100vh]">
      <div className="f-ic-col min-w-[660px] relative">
        <div className="px-5 w-full max-w-[1230px]">
          <div className="f-ic justify-between my-10 w-full xl:px-16">
            <p className="font-bold text-2xl">
              {displayedTab === '전체'
                ? '🍹 전체 혼술짝 방 리스트'
                : displayedTab}
            </p>
            <FilterPanel />
          </div>

          {!chatListMutation.isLoading && !chatList?.length && (
            <div className="f-jic w-full h-[70vh]">
              {' '}
              <NoRoom />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 h-full mb-14 mx-14 md:mx-0 xl:px-16">
            {chatList &&
              chatList.map((chatRoom) => (
                <div className="flex justify-center" key={chatRoom.roomId}>
                  <ChatroomCard chatRoom={chatRoom} />
                </div>
              ))}
          </div>
        </div>
        <div className="fixed sm:right-14 md:right-20 lg:right-28 xl:right-36 bottom-12">
          {isVisible && <BackToTop />}
        </div>
      </div>
    </section>
  );
};
