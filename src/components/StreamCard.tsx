import React from 'react'
import Image from 'next/image';
import { StreamInfo } from '@/types/types';
import { Trash2Icon } from 'lucide-react';

interface StreamCardProps extends StreamInfo {
  onDelete: () => void;
}

const StreamCard: React.FC<StreamCardProps> = ({ 
    cover, avatar, title, following, classification, prelive, livestate, live_room_id,
    onDelete
}) => {
    const renderLiveIcon = () => {
        if (livestate === 0) {
          return null;
        } else if (livestate === 1) {
          // Add logic for livestate 1
          return <Image src='https://shark2.douyucdn.cn/front-publish/live-master/assets/images/live_88e1ca6.webp'
          alt='online' 
          className='rounded-full absolute bottom-0 right-0' 
          referrerPolicy='no-referrer' 
          width={20} height={20}/>;
        } else if (livestate === 2) {
          // Add logic for livestate 2
          return  <Image src='https://shark2.douyucdn.cn/front-publish/live-master/assets/images/wheel_3d29558.webp'
          alt='circle' 
          className='rounded-full absolute bottom-0 right-0' 
          referrerPolicy='no-referrer' 
          width={20} height={20}/>
        }
      };

    const calcTimeAgo = (timestamp: string) => {
      const date = new Date(timestamp);
      const now = Date.now();
      const gap = (now - date.getTime()) / 1000; // in seconds
      if (gap < 3600 * 24) {
        if (gap < 3600) return `${String(Math.floor(gap / 60))} minutes ago`;
        return `${String(Math.floor(gap / 3600))} hours ago`;
      }
      return `${String(Math.floor(gap / 86400))} days ago`;
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
                    <Image src={cover} alt="cover" className='w-full h-full object-cover rounded-t-2xl'
                    referrerPolicy="no-referrer"
                    width={280} height={228}
                    priority={true}
                    />

                    {/* <Image src={cover} alt="cover" className='w-full h-full object-cover rounded-t-2xl'
                    loader={({ src }) => {
                        const localSrc = `${src.split('?')[0].split('/').pop()}.jpg`;
                        return `/local/cover/${localSrc}`;
                    }}
                    referrerPolicy='no-referrer' onLoad={}/> */}
                </div>
                {/* to be solved */}
                {/* <div className='group bg-red-100 h-35.5 hover:h-38.25'>
                    <Image src={cover} alt="cover" className='w-full h-full object-cover group-hover:hidden' />
                    <Image src={hv} alt="real-time-img" className='w-full h-full object-cover hidden group-hover:block' />
                </div> */}
                
                
                <div className='flex items-center p-2 w-full rounded-b-2xl bg-slate-50'>
                    {/* add flex shrink to solve flex shrink problem */}
                    <div className='relative w-12 h-12 flex-shrink-0'>
                        <Image src={avatar} alt="avatar" className='w-full h-full rounded-full'
                         referrerPolicy="no-referrer"
                        width={40} height={40}/>
                    
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

                <Trash2Icon className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-white' 
                onClick={onDelete}/>
            </div>
            
      </div>
  )
}

export default StreamCard