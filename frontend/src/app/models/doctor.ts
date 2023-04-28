import { Portofolio } from "./portofolio";

export interface Doctor {
    id: number,
    email: string;
    userName: string;
    portofolio: Portofolio[];
}