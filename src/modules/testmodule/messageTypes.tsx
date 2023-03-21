export interface messageTypes {
    message: messageEntity[],
    message_count: number
}
export interface messageEntity {
    id: number;
    sender_id: number;
    receiver_id: number;
    jd_id_id?: number;
    text: string;
    is_read?: boolean;
    date_created: string;
    first_name: string;
    last_name: string;
    jd?: number;
    message?: string;
    time?: string;
    profile_pic: string;
    can_id: number;
    can_source: string;
}
export interface messageReducerState extends messageTypes {
    isLoading: boolean;
    error: string;
  }