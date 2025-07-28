import { Button } from "@/components/ui/button";
import { Calendar, UserCheck } from "lucide-react";

interface HeroSectionProps {
  onBookAppointmentClick: () => void;
  onDoctorLoginClick: () => void;
}

export function HeroSection({ onBookAppointmentClick, onDoctorLoginClick }: HeroSectionProps) {
  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in slide-in-from-left duration-500">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Health, Our{" "}
              <span className="text-primary">Priority</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Book appointments with top doctors, manage your health records, and get the care you deserve. Simple, secure, and reliable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onBookAppointmentClick}
                className="text-lg px-8 py-4 h-auto"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onDoctorLoginClick}
                className="text-lg px-8 py-4 h-auto"
              >
                <UserCheck className="mr-2 h-5 w-5" />
                I'm a Doctor
              </Button>
            </div>
          </div>
          <div className="animate-in slide-in-from-right duration-500">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Doctor consultation with patient in modern medical office"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
