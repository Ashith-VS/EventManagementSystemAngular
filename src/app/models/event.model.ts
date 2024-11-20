export interface eventModel{
    name: string;
    date: string;
    venue: string;
    description: string;
    price: string;
    id: string;
    previewImages:string[];
    startTime: string;
    participantLimit: string;
    AvailableTickets: string;
  endTime: string;
  details?:string;
}