export interface StoppageReportResponseData {
    s: number;
    d: number;
    la: number;
    lo: number;
    nt: number;
    date: any;
    c: number;
    t: string;
    ln: string;
    ld: string;

    motion: boolean
    motionType: string

    fromDate: Date
    toDate: Date
    toNT  : number
    fromNT : number

    distance: number;

    durationInSecs: number
    durationFormatted: string
}

export interface StoppageReportResponse {
    status: boolean;
    message: string;
    exe_time: string;
    count: number;
    data: StoppageReportResponseData[];
}



