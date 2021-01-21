export interface Wash {
    id: string;
    type: number;
    duration: number;
    done: boolean;
}

export interface NewWash {
    email: string;
    type: number;
}

export interface UpdateWash {
    email: string;
    startNow: boolean;
    abort: boolean;
}
