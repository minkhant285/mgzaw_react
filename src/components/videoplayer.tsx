import React, { useEffect, useRef } from 'react';
import 'fluid-player/src/css/fluidplayer.css'
import FluidPlayer from 'fluid-player';

interface FluidPlayerProps {
    videoUrl: string;
    adTagUrl?: string; // Optional for VAST ads
    thumbnail_url: string;
}

const FluidVideoPlayer: React.FC<FluidPlayerProps> = ({ videoUrl, adTagUrl, thumbnail_url }) => {
    let self = useRef(null);
    let player: any = null;

    useEffect(() => {
        if (!player) {
            player = FluidPlayer('hls-video',
                {
                    layoutControls: {
                        fillToContainer: true,
                        keyboardControl: true,
                        posterImage: thumbnail_url,
                        primaryColor: '#f00'
                    },
                    vastOptions: {
                        showPlayButton: true,
                        adList: [{
                            roll: 'preRoll',
                            vastTag: adTagUrl as string,

                        },
                        {
                            roll: 'onPauseRoll',
                            vastTag: 'https://s.magsrv.com/splash.php?idzone=5426630',
                        },
                        {
                            roll: 'postRoll',
                            vastTag: 'https://s.magsrv.com/v1/vast.php?idzone=5454502',
                        }
                        ],
                        skipButtonCaption: 'Wait [seconds] more second(s)'
                    }
                }
            );
        }
    }, []);

    return (
        <div style={{ width: '100%' }} className='md:h-[400px] h-[280px]'>
            <video ref={self} controls id='hls-video'>
                <source src={videoUrl}
                    data-fluid-hd
                    title='1080p'
                    type='application/x-mpegURL' />
            </video>
        </div>
    );
};

export default FluidVideoPlayer;
