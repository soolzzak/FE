import { HeroSection } from '../components/Home/HeroSection';
import { CategoryTab } from '../components/Home/CategoryTab';
import { HomeBodySection } from '../components/Home/HomeBodySection';
import { Modal } from '../components/common/Modal';
import { useModal } from '../hooks/useModal';
import { AddRoom } from '../components/Home/AddRoom';
import { CommonButton } from '../components/common/CommonButton';
import { JoinRoomModal } from '../components/Home/JoinRoomModal';
import { WaitingModal } from '../components/Home/WaitingModal';

export const Home = () => {
  const [isOpen, onClose, setIsOpen] = useModal();
  const [joinOpen, joinClose, setJoinOpen] = useModal();
  const [waitingOpen, waitingClose, setWatingOpen] = useModal();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} >
        <AddRoom isOpen={isOpen} />
      </Modal>

      <Modal isOpen={joinOpen} onClose={joinClose} >
        <JoinRoomModal setJoinOpen={setJoinOpen} setWatingOpen={setWatingOpen} />
      </Modal>

      <Modal isOpen={waitingOpen} onClose={waitingClose} >
        <WaitingModal waitingClose={waitingClose}/>
      </Modal>

      <div className="f-ic-col bg-[#F2F2F2;] min-h-screen w-full">
        <HeroSection />
        <CategoryTab />
        <HomeBodySection />
        <CommonButton
          buttonText="혼술짝 방만들기"
          clickHandler={() => setIsOpen(true)}
          textSize="2xl"
          dimensions="h-20 w-full"
        />
        <button className='border' type='button' onClick={() => setJoinOpen(true)}>임시 joinroommodal 버튼</button>
      </div>
    </>
  );
};
