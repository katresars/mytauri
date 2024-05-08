import React from 'react'
import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';

interface StreamCardProps {
    cover: string;
    avatar: string;
    title: string;
    following: number;
    classification: string;
    prelive: string;
    livestate: number;
    live_room_id: number;
}
  
const StreamCard: React.FC<StreamCardProps> = ({ 
    cover, avatar, title, following, classification, prelive, livestate, live_room_id
}) => {
    const renderLiveIcon = () => {
        if (livestate === 0) {
          return null;
        } else if (livestate === 1) {
          // Add logic for livestate 1
          return <img src='https://shark2.douyucdn.cn/front-publish/live-master/assets/images/live_88e1ca6.webp' alt='onlive' className='w-5 h-5 rounded-full absolute bottom-0 right-0' />;
        } else if (livestate === 2) {
          // Add logic for livestate 2
          return  <img src='https://shark2.douyucdn.cn/front-publish/live-master/assets/images/wheel_3d29558.webp' alt='cicle' className='w-5 h-5 rounded-full absolute bottom-0 right-0' />;
        } else {
          return null;
        }
      };

    const calcTimeAgo = (timestamp: string) => {
      const date = new Date(timestamp);
      const now = Date.now();
      const gap = (now - date.getTime()) / 1000; // in seconds
      if (gap < 3600 * 24) {
        if (gap < 3600) return `${Math.floor(gap / 60)} minutes ago`;
        return `${Math.floor(gap / 3600)} hours ago`;
      }
      return `${Math.floor(gap / 86400)} days ago`;
    };
    
    return (

      <div className='flex px-3.5 hover:px-1'
        style={{width: '280px', height: '228px'}}
        >
            <div className='relative flex flex-col items-center w-63 h-52 group hover:w-68 hover:h-56 px-0
            outline outline-1 outline-white/20 rounded-2xl'
            >
                <div className=' h-35.5 hover:h-38.25'
                >
                    <img src={cover} alt="cover" className='w-full h-full object-cover rounded-t-2xl' 
                    referrerPolicy="no-referrer"/>
                    {/* <Image src={cover} alt="cover" className='w-full h-full object-cover rounded-t-2xl'
                    loader={({ src }) => {
                        const localSrc = `${src.split('?')[0].split('/').pop()}.jpg`;
                        return `/local/cover/${localSrc}`;
                    }}
                    referrerPolicy='no-referrer' onLoad={}/> */}
                </div>
                {/* to be solved */}
                {/* <div className='group bg-red-100 h-35.5 hover:h-38.25'>
                    <img src={cover} alt="cover" className='w-full h-full object-cover group-hover:hidden' />
                    <img src={hv} alt="real-time-img" className='w-full h-full object-cover hidden group-hover:block' />
                </div> */}
                
                
                <div className='flex items-center p-2 w-full rounded-b-2xl bg-slate-50'>
                    {/* add flex shrink to solve flex shrink problem */}
                    <div className='relative w-12 h-12 flex-shrink-0'>
                        <img src={avatar} alt="avatar" className='w-full h-full rounded-full' 
                        referrerPolicy="no-referrer"/>
                        {renderLiveIcon()}
                    </div>
                    <div className='flex flex-col w-full pl-2 h-12'>
                        <div className='flex h-1/2 items-center'>
                            <strong className='text-sm'>{title}</strong>
                            <span className='flex ml-auto justify-end text-center text-xs'>
                              {classification}
                            </span>
                        </div>
                        <div className='flex h-1/2 items-center'>
                            <span className='text-xs'>{live_room_id ? <a href={`https://live.bilibili.com/${live_room_id.toString()}`}>{following}</a> : following}</span>
                            <span className='flex ml-auto justify-end text-center text-xs'>{calcTimeAgo(prelive)}</span>
                        </div>
                    </div>
                </div>

                {/* <Trash2Icon className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-white' 
                onClick={buttonFunction}/> */}
            </div>
            
      </div>
  )
}

export default StreamCard