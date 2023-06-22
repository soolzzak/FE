import React, { useRef, Dispatch, SetStateAction, useEffect } from 'react';

export const TakeSnapshot = ({
  localVideoRef,
  remoteVideoRef,
  takePicture,
  setTakePicture,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  takePicture: boolean;
  setTakePicture: Dispatch<SetStateAction<boolean>>;
}) => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const captureSnapshot = () => {
    if (!localVideoRef.current || !remoteVideoRef.current) return;
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;
    const canvasWidth = localVideo.videoWidth + remoteVideo.videoWidth;
    const canvasHeight = Math.max(
      localVideo.videoHeight,
      remoteVideo.videoHeight
    );

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      localVideo,
      0,
      0,
      localVideo.videoWidth,
      localVideo.videoHeight
    );

    ctx?.drawImage(
      remoteVideo,
      localVideo.videoWidth,
      0,
      remoteVideo.videoWidth,
      remoteVideo.videoHeight
    );

    const snapshot = canvas.toDataURL('image/png');
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = snapshot;
      downloadLinkRef.current.download = 'snapshot.png';
      downloadLinkRef.current.click();
    }
  };
  useEffect(() => {
    if (takePicture) {
      captureSnapshot();
      setTakePicture(false);
    }
  }, [takePicture]);
  return (
    <a
      href="none"
      ref={downloadLinkRef}
      style={{ display: 'none' }}
      aria-hidden="true"
    >
      Download Link
    </a>
  );
};
