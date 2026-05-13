export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Drug {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  requiresPrescription: boolean;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface HealthRecord {
  id: string;
  title: string;
  date: string;
  doctor: string;
  type: 'Lab Result' | 'Prescription' | 'Report';
  size: string;
  status: 'Verified' | 'Expired' | 'Pending';
}
