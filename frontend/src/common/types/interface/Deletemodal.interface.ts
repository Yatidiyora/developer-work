import { KeyMultiTypeValue } from "./Common.interface";

export interface CommonDeleteModal {
    action: KeyMultiTypeValue;
    setAction: React.Dispatch<React.SetStateAction<any | undefined>>;
    stateChange: () => void;
    actionTitle: string;
    modalHeading: string;
    modalSubHeading: string;
    renderFieldComponent: any;
    actionFun: (id: string) => Promise<any>; 
}