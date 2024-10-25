// import React, { useEffect, useRef } from 'react';
// import Hls from 'hls.js';

// interface HLSPlayerProps {
//     hlsUrl: string;
//     autoPlay?: boolean;
//     controls?: boolean;
//     width?: string | number;
//     height?: string | number;
// }

// const HLSPlayer: React.FC<HLSPlayerProps> = ({
//     hlsUrl,
//     autoPlay = false,
//     controls = true,
//     width = "100%",
//     height = "auto"
// }) => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);

//     useEffect(() => {
//         if (videoRef.current) {
//             if (Hls.isSupported()) {
//                 const hls = new Hls();
//                 hls.loadSource(hlsUrl);
//                 hls.attachMedia(videoRef.current);

//                 hls.on(Hls.Events.MANIFEST_PARSED, () => {
//                     if (autoPlay) {
//                         videoRef.current?.play();
//                     }
//                 });

//                 hls.on(Hls.Events.ERROR, (event, data) => {
//                     if (data.fatal) {
//                         switch (data.type) {
//                             case Hls.ErrorTypes.NETWORK_ERROR:
//                                 console.error("Network error in HLS stream");
//                                 hls.startLoad();
//                                 break;
//                             case Hls.ErrorTypes.MEDIA_ERROR:
//                                 console.error("Media error in HLS stream");
//                                 hls.recoverMediaError();
//                                 break;
//                             default:
//                                 hls.destroy();
//                                 break;
//                         }
//                     }
//                 });

//                 return () => hls.destroy();
//             } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
//                 // Fallback for Safari
//                 videoRef.current.src = hlsUrl;
//             }
//         }
//     }, [hlsUrl, autoPlay]);

//     return (
//         <video
//             ref={videoRef}
//             controls={controls}
//             style={{ width, height }}
//         />
//     );
// };

// export default HLSPlayer;


import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import Hls from 'hls.js';
import 'videojs-contrib-ads';
import 'videojs-ima';
import 'video.js/dist/video-js.css';

interface VideoPlayerWithAdsProps {
    hlsUrl: string;
    vastUrl: string;
    autoPlay?: boolean;
    controls?: boolean;
}

const VideoPlayerWithAds: React.FC<VideoPlayerWithAdsProps> = ({ hlsUrl, vastUrl, autoPlay = false, controls = true }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<videojs.Player | null>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const videoJsOptions = {
            autoplay: autoPlay,
            controls: controls,
            preload: 'auto',
            techOrder: ['html5'],
        };

        const player = videojs(videoRef.current, videoJsOptions);
        playerRef.current = player;

        // Check if HLS.js is needed (for browsers that don't support native HLS)
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(hlsUrl);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (autoPlay) {
                    videoRef.current?.play();
                }
            });
        } else {
            // If the browser supports HLS natively, set the HLS URL directly
            player.src({ src: hlsUrl, type: 'application/x-mpegURL' });
        }

        // Configure VAST ads
        player.ima({
            id: videoRef.current.id,
            adTagUrl: vastUrl,
            debug: true,
        });

        // Clean up the player when the component unmounts
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [hlsUrl, vastUrl, autoPlay, controls]);

    return (
        <div>
            <video
                ref={videoRef}
                id="video-player"
                className="video-js vjs-default-skin vjs-big-play-centered"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default VideoPlayerWithAds;
