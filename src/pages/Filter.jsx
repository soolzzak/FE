// import { useEffect, useRef, useState } from 'react';
// import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';

// function Filter() {
//   const inputVideoRef = useRef();
//   const canvasRef = useRef();
//   const contextRef = useRef();
//   const anotherVideoRef = useRef();
//   const streamRef = useRef();

//   const onResults = (results) => {
//     contextRef.current.save();
//     contextRef.current.clearRect(
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );
//     contextRef.current.drawImage(
//       results.segmentationMask,
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );
//     // Only overwrite existing pixels.
//     contextRef.current.globalCompositeOperation = 'source-out';
//     contextRef.current.fillStyle = '#00ff00';
//     contextRef.current.fillRect(
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );

//     // Only overwrite missing pixels.
//     contextRef.current.globalCompositeOperation = 'destination-atop';
//     contextRef.current.drawImage(
//       results.image,
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );

//     contextRef.current.restore();
//   };

//   useEffect(() => {
//     contextRef.current = canvasRef.current.getContext('2d');
//     const constraints = {
//       video: { width: { min: 1280 }, height: { min: 720 } },
//     };

//     const selfieSegmentation = new SelfieSegmentation({
//       locateFile: (file) =>
//         `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
//     });

//     selfieSegmentation.setOptions({
//       modelSelection: 1,
//       selfieMode: true,
//     });
//     selfieSegmentation.onResults(onResults);

//     const sendToMediaPipe = async () => {
//       if (!inputVideoRef.current.videoWidth) {
//         requestAnimationFrame(sendToMediaPipe);
//       } else {
//         await selfieSegmentation.send({ image: inputVideoRef.current });
//         requestAnimationFrame(sendToMediaPipe);
//       }
//     };

//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//       inputVideoRef.current.srcObject = stream;
//       sendToMediaPipe();
//       streamRef.current = canvasRef.current.captureStream(30);
//       anotherVideoRef.current.srcObject = streamRef.current;
//     });
//   }, []);

//   return (
//     <div className="App">
//       {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
//       <video autoPlay ref={inputVideoRef} />
//       {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
//       <video autoPlay ref={anotherVideoRef} />
//       <canvas ref={canvasRef} width={1280} height={720} hidden />
//     </div>
//   );
// }
// export default Filter;
