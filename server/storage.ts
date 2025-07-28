import { type User, type InsertUser, type Doctor, type InsertDoctor, type Appointment, type InsertAppointment, type DoctorWithUser, type AppointmentWithDetails } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Doctor methods
  getDoctor(id: string): Promise<Doctor | undefined>;
  getDoctorByUserId(userId: string): Promise<Doctor | undefined>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  getAllDoctors(): Promise<DoctorWithUser[]>;
  
  // Appointment methods
  getAppointment(id: string): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentsByPatient(patientId: string): Promise<AppointmentWithDetails[]>;
  getAppointmentsByDoctor(doctorId: string): Promise<AppointmentWithDetails[]>;
  updateAppointmentStatus(id: string, status: "pending" | "confirmed" | "cancelled" | "completed"): Promise<Appointment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private doctors: Map<string, Doctor>;
  private appointments: Map<string, Appointment>;

  constructor() {
    this.users = new Map();
    this.doctors = new Map();
    this.appointments = new Map();
    this.seedData();
  }

  private seedData() {
    // Create sample doctors
    const doctor1Id = randomUUID();
    const doctor1User: User = {
      id: doctor1Id,
      email: "sarah.johnson@medicare.com",
      password: "password123",
      firstName: "Sarah",
      lastName: "Johnson",
      phone: "555-0101",
      role: "doctor",
      createdAt: new Date(),
    };
    this.users.set(doctor1Id, doctor1User);

    const doctor1: Doctor = {
      id: randomUUID(),
      userId: doctor1Id,
      specialization: "Cardiologist",
      experience: 15,
      rating: "4.9",
      reviewCount: 127,
      available: true,
    };
    this.doctors.set(doctor1.id, doctor1);

    const doctor2Id = randomUUID();
    const doctor2User: User = {
      id: doctor2Id,
      email: "michael.chen@medicare.com",
      password: "password123",
      firstName: "Michael",
      lastName: "Chen",
      phone: "555-0102",
      role: "doctor",
      createdAt: new Date(),
    };
    this.users.set(doctor2Id, doctor2User);

    const doctor2: Doctor = {
      id: randomUUID(),
      userId: doctor2Id,
      specialization: "Pediatrician",
      experience: 12,
      rating: "4.8",
      reviewCount: 95,
      available: true,
    };
    this.doctors.set(doctor2.id, doctor2);

    const doctor3Id = randomUUID();
    const doctor3User: User = {
      id: doctor3Id,
      email: "emily.rodriguez@medicare.com",
      password: "password123",
      firstName: "Emily",
      lastName: "Rodriguez",
      phone: "555-0103",
      role: "doctor",
      createdAt: new Date(),
    };
    this.users.set(doctor3Id, doctor3User);

    const doctor3: Doctor = {
      id: randomUUID(),
      userId: doctor3Id,
      specialization: "Dermatologist",
      experience: 8,
      rating: "4.9",
      reviewCount: 203,
      available: true,
    };
    this.doctors.set(doctor3.id, doctor3);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getDoctor(id: string): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }

  async getDoctorByUserId(userId: string): Promise<Doctor | undefined> {
    return Array.from(this.doctors.values()).find(doctor => doctor.userId === userId);
  }

  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const id = randomUUID();
    const doctor: Doctor = {
      ...insertDoctor,
      id,
      rating: "4.0",
      reviewCount: 0,
      available: true,
    };
    this.doctors.set(id, doctor);
    return doctor;
  }

  async getAllDoctors(): Promise<DoctorWithUser[]> {
    const doctors = Array.from(this.doctors.values());
    const doctorsWithUsers: DoctorWithUser[] = [];
    
    for (const doctor of doctors) {
      const user = await this.getUser(doctor.userId);
      if (user) {
        doctorsWithUsers.push({ ...doctor, user });
      }
    }
    
    return doctorsWithUsers;
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = {
      ...insertAppointment,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointmentsByPatient(patientId: string): Promise<AppointmentWithDetails[]> {
    const appointments = Array.from(this.appointments.values()).filter(
      apt => apt.patientId === patientId
    );
    
    const appointmentsWithDetails: AppointmentWithDetails[] = [];
    
    for (const appointment of appointments) {
      const doctor = await this.getDoctor(appointment.doctorId);
      const patient = await this.getUser(appointment.patientId);
      
      if (doctor && patient) {
        const doctorUser = await this.getUser(doctor.userId);
        if (doctorUser) {
          appointmentsWithDetails.push({
            ...appointment,
            doctor: { ...doctor, user: doctorUser },
            patient,
          });
        }
      }
    }
    
    return appointmentsWithDetails;
  }

  async getAppointmentsByDoctor(doctorId: string): Promise<AppointmentWithDetails[]> {
    const appointments = Array.from(this.appointments.values()).filter(
      apt => apt.doctorId === doctorId
    );
    
    const appointmentsWithDetails: AppointmentWithDetails[] = [];
    
    for (const appointment of appointments) {
      const doctor = await this.getDoctor(appointment.doctorId);
      const patient = await this.getUser(appointment.patientId);
      
      if (doctor && patient) {
        const doctorUser = await this.getUser(doctor.userId);
        if (doctorUser) {
          appointmentsWithDetails.push({
            ...appointment,
            doctor: { ...doctor, user: doctorUser },
            patient,
          });
        }
      }
    }
    
    return appointmentsWithDetails;
  }

  async updateAppointmentStatus(id: string, status: "pending" | "confirmed" | "cancelled" | "completed"): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      const updatedAppointment = { ...appointment, status };
      this.appointments.set(id, updatedAppointment);
      return updatedAppointment;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
