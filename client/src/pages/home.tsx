import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { DoctorsSection } from "@/components/doctors-section";
import { Footer } from "@/components/footer";
import { AuthModals } from "@/components/auth-modals";
import { BookingModal } from "@/components/booking-modal";
import { useAuth } from "@/context/auth-context";
import { DoctorWithUser } from "@shared/schema";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorWithUser | null>(null);
  const { isAuthenticated } = useAuth();

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleBookAppointmentClick = () => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
      return;
    }
    setIsBookingOpen(true);
  };

  const handleDoctorLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleBookWithDoctor = (doctor: DoctorWithUser) => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
      return;
    }
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      
      <HeroSection
        onBookAppointmentClick={handleBookAppointmentClick}
        onDoctorLoginClick={handleDoctorLoginClick}
      />
      
      <FeaturesSection />
      
      <DoctorsSection onBookWithDoctor={handleBookWithDoctor} />
      
      <Footer />
      
      <AuthModals
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onRegisterClose={() => setIsRegisterOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
      
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedDoctor(null);
        }}
        selectedDoctor={selectedDoctor}
      />
    </div>
  );
}
