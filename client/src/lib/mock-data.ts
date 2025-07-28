// Constants and mock data for the application

export const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

export const appointmentReasons = [
  { value: "regular-checkup", label: "Regular Checkup" },
  { value: "follow-up", label: "Follow-up" },
  { value: "new-symptoms", label: "New Symptoms" },
  { value: "emergency", label: "Emergency" },
  { value: "consultation", label: "Consultation" },
  { value: "prescription-refill", label: "Prescription Refill" },
];

export const appointmentTypes = [
  { value: "in-person", label: "In-Person" },
  { value: "video", label: "Video Consultation" },
  { value: "phone", label: "Phone Consultation" },
];

export const specializations = [
  "Cardiologist",
  "Pediatrician", 
  "Dermatologist",
  "Neurologist",
  "Orthopedic Surgeon",
  "Gynecologist",
  "Psychiatrist",
  "Ophthalmologist",
  "ENT Specialist",
  "General Practitioner",
];

export const doctorImages = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
  "https://images.unsplash.com/photo-1612531389787-1718690fd8d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
  "https://images.unsplash.com/photo-1594824375155-b74c798bb2d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
];

export const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
} as const;

export const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed", 
  cancelled: "Cancelled",
  completed: "Completed",
} as const;

// Navigation links for the landing page
export const navLinks = [
  { href: "home", label: "Home" },
  { href: "features", label: "Features" },
  { href: "doctors", label: "Doctors" },
  { href: "contact", label: "Contact" },
];

// Feature cards data
export const features = [
  {
    title: "Easy Booking",
    description: "Book appointments with your preferred doctors in just a few clicks. View available slots and choose what works best for you.",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Expert Doctors", 
    description: "Connect with certified and experienced doctors across various specializations. Quality healthcare at your fingertips.",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Secure & Private",
    description: "Your health data is protected with enterprise-grade security. Complete privacy and compliance with healthcare standards.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support to help you with any queries. We're here whenever you need assistance.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Mobile Friendly", 
    description: "Access your appointments and health records from any device. Fully responsive design for seamless experience.",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Health Tracking",
    description: "Keep track of your health history, prescriptions, and upcoming appointments all in one convenient place.",
    color: "bg-red-100 text-red-600",
  },
];

// Quick action items for patient dashboard
export const patientQuickActions = [
  { 
    label: "Book New Appointment",
    icon: "Plus",
    action: "book-appointment",
    primary: true,
  },
  {
    label: "Medical Records", 
    icon: "FileText",
    action: "medical-records",
    primary: false,
  },
  {
    label: "Prescriptions",
    icon: "Pill", 
    action: "prescriptions",
    primary: false,
  },
];

// Quick action items for doctor dashboard  
export const doctorQuickActions = [
  {
    label: "Manage Availability",
    icon: "Calendar",
    action: "manage-availability",
  },
  {
    label: "Patient History",
    icon: "Clock",
    action: "patient-history", 
  },
  {
    label: "Reports",
    icon: "BarChart3",
    action: "reports",
  },
];
