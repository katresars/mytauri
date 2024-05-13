export interface StreamInfo {
    uid: number;
    cover: string;
    avatar: string;
    title: string;
    following: string;
    classification: string;
    prelive: string;
    livestate: number;
    live_room_id: number;
}

export interface StreamDict {
    items: StreamInfo[]
}