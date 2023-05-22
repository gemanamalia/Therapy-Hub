export interface Appointment {
    id: number;
    day: string;
    start: string;
    end: string;
    userId: number;
    doctorId: number;
    doctorName: string;
}