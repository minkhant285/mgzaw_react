import React, { useEffect, useRef } from "react";
//@ts-ignore
import videojs, { VideoJsPlayer } from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-ads";
import "videojs-ima";

interface VideoAdPlayerProps {
    vastTagUrl: string; // The VAST URL for the ad
    videoUrl: string;   // The main content video URL
}

const VideoAdPlayer: React.FC<VideoAdPlayerProps> = ({ vastTagUrl, videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<VideoJsPlayer | null>(null);

    useEffect(() => {
        const loadGoogleImaSdk = () => {
            //@ts-ignore
            if (window.google && window.google.ima) {
                initializePlayer();
            } else {
                const script = document.createElement("script");
                script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
                script.onload = initializePlayer;
                document.head.appendChild(script);
            }
        };

        const initializePlayer = () => {
            if (videoRef.current) {
                // Initialize the video.js player
                const player = videojs(videoRef.current, {
                    controls: true,
                    autoplay: true,
                    preload: "auto",
                    fluid: true,
                });

                playerRef.current = player;

                // Initialize IMA plugin with the VAST tag URL
                //@ts-ignore
                player.ima({
                    adTagUrl: vastTagUrl,
                });

                // Request ads immediately
                //@ts-ignore
                player.ima.requestAds();

                // Cleanup on component unmount
                return () => {
                    if (playerRef.current) {
                        playerRef.current.dispose();
                    }
                };
            }
        };

        loadGoogleImaSdk();
    }, [vastTagUrl]);

    return (
        <div>
            <video
                ref={videoRef}
                className="video-js vjs-default-skin h-28"
                controls
                preload="auto"
                autoPlay={false}
                controlsList='nodownload'
                style={{ backgroundColor: 'black', width: '100%', maxHeight: 350, height: window.innerWidth < 400 ? 220 : '0%' }}
            >
                <source src={videoUrl} />
            </video>
        </div >
    );
};

export default VideoAdPlayer;
