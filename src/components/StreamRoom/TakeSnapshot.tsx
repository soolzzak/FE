import React, { useRef } from 'react';

export const TakeSnapshot = ({
  localVideoRef,
  remoteVideoRef,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const captureSnapshot = () => {
    if (!localVideoRef.current || !remoteVideoRef.current) return;
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;

    // Determine the size of the combined snapshot canvas
    const canvasWidth = localVideo.videoWidth + remoteVideo.videoWidth;
    const canvasHeight = Math.max(
      localVideo.videoHeight,
      remoteVideo.videoHeight
    );

    // Create the combined snapshot canvas
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    // Draw the local video frame
    ctx?.drawImage(
      localVideo,
      0,
      0,
      localVideo.videoWidth,
      localVideo.videoHeight
    );

    // Draw the remote video frame next to the local video frame
    ctx?.drawImage(
      remoteVideo,
      localVideo.videoWidth,
      0,
      remoteVideo.videoWidth,
      remoteVideo.videoHeight
    );

    // Get the combined snapshot as a base64 image
    const snapshot = canvas.toDataURL('image/png');

    // Set the snapshot as the href attribute of the download link
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = snapshot;
      downloadLinkRef.current.download = 'snapshot.png';

      // Trigger the download
      downloadLinkRef.current.click();
    }
  };
  return (
    <div>
      <a
        href="none"
        ref={downloadLinkRef}
        style={{ display: 'none' }}
        tabIndex={-1}
        aria-hidden="true"
      >
        Download Link
      </a>
      <button type="button" onClick={captureSnapshot}>
        capture
      </button>
    </div>
  );
};
