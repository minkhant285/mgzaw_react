interface VideoAdPlayerProps {
    vastTagUrl: string; // The VAST URL for the ad
    videoUrl: string;   // The main content video URL
    vidkey: string;
    poster: string;
}

//@ts-ignore
import ReactJWPlayer from "react-jw-player";

const VideoAdPlayer: React.FC<VideoAdPlayerProps> = ({ vastTagUrl, videoUrl, vidkey, poster }) => {
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
            <ReactJWPlayer
                image={poster}
                file={videoUrl}
                playerId={vidkey}
                playerScript="https://cdn.jwplayer.com/libraries/cDnha7c4.js"
                customProps={{ advertising: { ...ads } }}
            />
        </div>
    );
}

export default VideoAdPlayer;
