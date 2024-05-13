import type { NextPage } from "next"
// import { invoke } from "@tauri-apps/api/tauri"
import { useEffect, useState } from "react"
import StreamCard from "@/components/StreamCard"
import { StreamInfo, StreamDict} from "../../types/types"
// import { invoke } from "@tauri-apps/api"
// add new invoke by adding tauri.ts https://github.com/kvnxiao/tauri-nextjs-template
import { invoke } from "@/lib/tauri"

const Streams: NextPage = () => {
  const [streamInfo, setStreamInfo] = useState<StreamInfo[]>([]);
  
  useEffect(() => {
    invoke<StreamDict>('load_userinfo')
      .then((data) => {
        console.log(data)
        setStreamInfo(data.items)
      }).catch(() => {
        console.log('load error')
      })
  }, []);

  const handleAdd = (data: StreamInfo) => {
    const index = streamInfo.findIndex(item => item.uid === data.uid);
    if (index !== -1) {
        streamInfo[index] = data;
        setStreamInfo([...streamInfo]);
        console.log('repeated data:', data.uid);
    } else {
        setStreamInfo(prevData => [...prevData, data]);
        console.log('added data:', data.uid);
    }

    invoke('add_userinfo', {"userInfo": data}).then(() => {
      console.log('adding data:', data.uid);
    }).catch(() => {
        console.log('adding error');
    })
  };

  const handleDelete = (id: number) => {
    const updatedData = streamInfo.filter((_, index) => index !== id);
    invoke('delete_userinfo', { "uid": id }).then(() => {
        console.log('deleting data:', id);
    }).catch(() => {
        console.log('deleting error');
    })
    setStreamInfo(updatedData);    
  }

  const handleFetch = async (roomLink: string) => {
    const data = await invoke<StreamInfo>('fetch_data', { "roomid": roomLink });
    console.log('fetched data:', data);
    handleAdd(data);
  }

  const handleRefresh = async () => {
    const room_ids = streamInfo.map(data => data.live_room_id);
    for (const room_id of room_ids) {
      await handleFetch(room_id.toString()).catch(() => {
        console.log('fetching error:', room_id);
      });
    }
  }

  return (
    <main className="flex-1">
      <p>This is the streams page</p>
      <hr className="my-2" />
      <div className="flex flex-row">
        <button onClick={() => {
          const roomLink = prompt("Please enter the room link");
          if (roomLink) {
            handleFetch(roomLink).then(() => {
              console.log('fetched data:', roomLink);
            }).catch(() => {
              console.log('fetching error:', roomLink);
            });
          }
        }}>
          Fetch
        </button>

        <button onClick={() => {
          handleRefresh().catch(() => {
            console.log('refresh error');
          })
        }} className="ml-2">
          Refresh
        </button>

        <p className="ml-2">Total: {streamInfo.length}</p>
      </div>
      <div className='w-full bg-gray-300 flex-grow' style={{height: '80vh', overflow: 'auto'}}>
          <div className='grid grid-cols-4 pt-1.5'>              
          {streamInfo.map((item, index) => (
            <div key={item.uid} className="relative group">
              <StreamCard key={item.uid} {...item} onDelete={() => {handleDelete(index)}}/>
            </div>
          ))}
          </div>
      </div>
    </main>
  )
}

export default Streams