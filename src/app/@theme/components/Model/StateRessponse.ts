
export interface States {
    state_id: string;
    state: string;
}

export interface StateResponse {
    status: boolean;
    message: string;
    data: States[];
}



