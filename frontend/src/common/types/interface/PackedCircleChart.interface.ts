export interface PackedCircle {
    name: string;
    value: number;
    label: string;
    color: string;
    children?: PackedCircle[];
}