export interface Wash {
    id: string;
    type: number;
    duration: number;
    done: boolean;
}

export interface NewWash {
    email: string;
    type: number;
    startNow: boolean;
}

export interface UpdateWash {
    email: string;
    startNow: boolean;
    abort: boolean;
}
