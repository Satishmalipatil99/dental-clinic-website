import { AppointmentRecord } from '../types';

const APPOINTMENTS_STORAGE_KEY = 'dental_clinic_appointments_v1';

const INITIAL_SAMPLE_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'APT-101',
    fullName: 'Rahul Sharma',
    phoneNumber: '+91 98111 22334',
    email: 'rahul.s@example.com',
    preferredDate: '2026-09-22',
    preferredTime: 'Morning (10:00 AM – 01:00 PM)',
    treatmentReason: 'Root Canal Treatment',
    additionalNotes: 'Mild sensitivity in upper left molar for 3 days.',
    createdAt: '2026-09-20T09:15:00.000Z',
    status: 'pending'
  },
  {
    id: 'APT-102',
    fullName: 'Priya Sundaram',
    phoneNumber: '+91 98444 55667',
    email: 'priya.s@example.com',
    preferredDate: '2026-09-23',
    preferredTime: 'Evening (05:00 PM – 08:30 PM)',
    treatmentReason: 'Teeth Whitening',
    additionalNotes: 'Interested in in-office whitening options before a wedding.',
    createdAt: '2026-09-19T14:30:00.000Z',
    status: 'confirmed'
  },
  {
    id: 'APT-103',
    fullName: 'Ananya Mehta',
    phoneNumber: '+91 98777 88990',
    email: 'ananya.m@example.com',
    preferredDate: '2026-09-21',
    preferredTime: 'Afternoon (01:00 PM – 04:30 PM)',
    treatmentReason: 'General Dental Checkup & Cleaning',
    additionalNotes: 'Routine 6-month preventive exam.',
    createdAt: '2026-09-18T11:00:00.000Z',
    status: 'confirmed'
  }
];

export function getStoredAppointments(): AppointmentRecord[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_APPOINTMENTS;
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_APPOINTMENTS));
      return INITIAL_SAMPLE_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read stored appointments', err);
    return INITIAL_SAMPLE_APPOINTMENTS;
  }
}

export function saveAppointment(data: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'>): AppointmentRecord {
  const newAppointment: AppointmentRecord = {
    ...data,
    id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  if (typeof window !== 'undefined') {
    try {
      const current = getStoredAppointments();
      const updated = [newAppointment, ...current];
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save appointment to localStorage', err);
    }
  }

  return newAppointment;
}

export function updateAppointmentStatus(
  id: string, 
  status: 'pending' | 'confirmed' | 'cancelled',
  notifications?: AppointmentRecord['notifications']
): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredAppointments();
    const updated = current.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          status,
          notifications: notifications ? { ...item.notifications, ...notifications } : item.notifications
        };
      }
      return item;
    });
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update appointment status', err);
  }
}

export function clearAllAppointments(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('Failed to clear appointments in localStorage', err);
  }
}
