import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

type Props={
    videoUrl: string;
    title:  string;
}

const CoursePlayer:FC<Props> = ({videoUrl}) => {
    const [videoData,setVideoData] = useState({
        otp: '',
        playbackInfo: ''
    });

    useEffect(()=>{
        // axios.post('http://localhost:8000/api/getVdoCipherOTP',
        axios.post('https://lerko-backend.vercel.app/api/getVdoCipherOTP',
        {
            videoUrl: videoUrl,
        }).then((res)=> {
            setVideoData(res.data);
        })
    },[videoUrl]);

    return(
        <div style={{paddingTop: '56.25%', overflow: 'hidden', position: 'relative'}}
        >
            {
                videoData.otp && videoData.playbackInfo !== '' && (
                    <iframe 
                    allowFullScreen={true}
                    allow='encrypted-media'
                    style={{
                        border: 0,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                        src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=Pg0P7fO2y3uZzKb7`}>

                    </iframe>
                )
            }
        </div>
    )
}

export default CoursePlayer;