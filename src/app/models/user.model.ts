export interface userModel {
    name: string;
    password: string;
    email: string;
    id: string;
    role: string;
    avatar?: string|null;
    ticketsBooked?:any[]
  }