import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

export const YoutubeContent = () => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const onVideoStatechange = (e: any) => {
    console.log(e.data);
  };
  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <YouTube
      className="h-full"
      videoId="rWkKG4IeTNY"
      opts={opts}
      onStateChange={onVideoStatechange}
      onReady={onPlayerReady}
    />
  );
};
