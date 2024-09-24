interface VideoAdPlayerProps {
    vastTagUrl: string; // The VAST URL for the ad
    videoUrl: string;   // The main content video URL
    vidkey: string;
    poster: string;
}

import { useState } from "react";
//@ts-ignore
import ReactJWPlayer from "react-jw-player";

const VideoAdPlayer: React.FC<VideoAdPlayerProps> = ({ vastTagUrl, videoUrl, vidkey, poster }) => {

    const [loading, setLoading] = useState<boolean>(true);

    let newScheduleArray = [
        {
            tag: [
                vastTagUrl
            ],
            type: "linear",
            offset: 5
        },
        {
            tag: [
                'https://s.magsrv.com/splash.php?idzone=5426630'
            ],
            type: "linear",
            offset: 10
        },
    ];

    const ads = {
        admessage: "This video will resume in 5 seconds",
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
        <div className="mt-1">


            {loading && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', zIndex: 10
                }}>
                    <div className="spinner text-white">Loading...</div> {/* Replace with your actual loader */}
                </div>
            )}

            <ReactJWPlayer
                image={poster}
                file={videoUrl}
                playerId={vidkey}
                playerScript="https://cdn.jwplayer.com/libraries/cDnha7c4.js"
                customProps={{ advertising: { ...ads } }}
                onReady={() => setLoading(false)}
                onPlay={() => setLoading(false)}
            />
        </div>
    );
}

export default VideoAdPlayer;
