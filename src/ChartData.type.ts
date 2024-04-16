export interface ChartDataType {
    name?: string;
    labels: string[];
    datasets: {
        data: number[];
    }[];
}

export interface TwoCompartment {
    concentration: {
        t: number[];
        C_t: number[];
    };
    auc: {
        t: number[];
        auc_t: number[];
    };
    trough: number;
    peak: number;
    auc_ss: number;
}

export interface PharmaKineticResponse {
    twoCompartment: TwoCompartment;
}