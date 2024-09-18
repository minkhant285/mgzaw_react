// import React, { useEffect, useRef } from "react";
// //@ts-ignore
// import videojs, { VideoJsPlayer } from "video.js";
// import "video.js/dist/video-js.css";
// import "videojs-contrib-ads";
// import "videojs-ima";

interface VideoAdPlayerProps {
    vastTagUrl: string; // The VAST URL for the ad
    videoUrl: string;   // The main content video URL
    key: string;
    poster: string;
}

// const VideoAdPlayer: React.FC<VideoAdPlayerProps> = ({ vastTagUrl, videoUrl, key, poster }) => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const playerRef = useRef<VideoJsPlayer | null>(null);

//     useEffect(() => {
//         const loadGoogleImaSdk = () => {
//             //@ts-ignore
//             if (window.google && window.google.ima) {
//                 initializePlayer();
//             } else {
//                 const script = document.createElement("script");
//                 script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
//                 script.onload = initializePlayer;
//                 document.head.appendChild(script);
//             }
//         };

//         const initializePlayer = () => {
//             if (videoRef.current) {
//                 // Initialize the video.js player
//                 const player = videojs(videoRef.current, {
//                     controls: true,
//                     autoplay: false,
//                     preload: "auto",
//                     fluid: true,
//                     width: '50%',
//                     height: 350
//                 });

//                 playerRef.current = player;

//                 // Initialize IMA plugin with the VAST tag URL
//                 //@ts-ignore
//                 player.ima({
//                     adTagUrl: vastTagUrl,
//                 });

//                 // Request ads immediately
//                 //@ts-ignore
//                 player.ima.requestAds();

//                 // Cleanup on component unmount
//                 return () => {
//                     if (playerRef.current) {
//                         playerRef.current.dispose();
//                     }
//                 };
//             }
//         };

//         loadGoogleImaSdk();
//     }, [vastTagUrl]);

//     return (
//         <div className="h-9">
//             <video
//                 ref={videoRef}
//                 key={key}
//                 className="video-js vjs-default-skin"
//                 controls
//                 preload="auto"
//                 autoPlay={false}
//                 controlsList='nodownload'
//                 poster={poster}
//                 // style={{ backgroundColor: 'black', width: '100%', maxHeight: 350, height: window.innerWidth < 400 ? 220 : '0%' }}
//                 style={{ backgroundColor: 'black', width: '100%', maxHeight: 300, height: window.innerWidth < 400 ? 220 : '0%' }}

//             >
//                 <source src={videoUrl} />
//             </video>
//         </div >
//     );
// };

// export default VideoAdPlayer;
//@ts-ignore
import ReactJWPlayer from "react-jw-player";

const VideoAdPlayer: React.FC<VideoAdPlayerProps> = ({ vastTagUrl, videoUrl, key, poster }) => {
    let newScheduleArray = [
        {
            tag: [
                vastTagUrl
            ],
            type: "linear",
            offset: 0
        },
    ];

    const ads = {
        admessage: "This video will resume in xx seconds",
        adscheduleid: "adscheduledid",
        client: "vast",
        cuetext: "Advertisement",
        outstream: false,
        preloadAds: false,
        vpaidcontrols: false,
        rules: {
            startOnSeek: "pre",
            timeBetweenAds: 0
        },
        schedule: newScheduleArray
    };

    return (
        <div >
            <ReactJWPlayer
                image={poster}
                file={videoUrl}
                playerId={key}
                playerScript="https://cdn.jwplayer.com/libraries/cDnha7c4.js"
                customProps={{ advertising: { ...ads } }}
            />
        </div>
    );
}

export default VideoAdPlayer;
