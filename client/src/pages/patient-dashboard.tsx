import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentCard } from "@/components/appointment-card";
import { BookingModal } from "@/components/booking-modal";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { AppointmentWithDetails, DoctorWithUser } from "@shared/schema";
import { useState } from "react";
import { Plus, FileText, Pill, Calendar, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorWithUser | null>(null);

  const { data: appointments, isLoading } = useQuery<AppointmentWithDetails[]>({
    queryKey: ["/api/appointments/patient", user?.id],
    enabled: !!user?.id,
  });

  const cancelMutation = useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await apiRequest("PATCH", `/api/appointments/${appointmentId}/status`, {
        status: "cancelled",
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Appointment cancelled successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to cancel appointment.",
        variant: "destructive",
      });
    },
  });

  if (!user || user.role !== "patient") {
    setLocation("/");
    return null;
  }

  const upcomingAppointments = appointments?.filter(
    (apt) => apt.status === "pending" || apt.status === "confirmed"
  ) || [];

  const completedAppointments = appointments?.filter(
    (apt) => apt.status === "completed"
  ).length || 0;

  const thisMonthAppointments = appointments?.filter((apt) => {
    const appointmentDate = new Date(apt.date);
    const now = new Date();
    return (
      appointmentDate.getMonth() === now.getMonth() &&
      appointmentDate.getFullYear() === now.getFullYear()
    );
  }).length || 0;

  const handleBookNewAppointment = () => {
    setIsBookingOpen(true);
  };

  const handleCancelAppointment = (appointment: AppointmentWithDetails) => {
    cancelMutation.mutate(appointment.id);
  };

  const handleRescheduleAppointment = (appointment: AppointmentWithDetails) => {
    // For now, just show a toast. In a real app, this would open a reschedule modal
    toast({
      title: "Reschedule",
      description: "Reschedule functionality would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
      />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-gray-600 mt-2">Manage your appointments and health records</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                <Button onClick={handleBookNewAppointment}>
                  <Plus className="h-4 w-4 mr-2" />
                  Book New
                </Button>
              </div>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-10 bg-gray-200 rounded"></div>
                          <div className="h-10 bg-gray-200 rounded"></div>
                          <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onReschedule={handleRescheduleAppointment}
                      onCancel={handleCancelAppointment}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No upcoming appointments
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Book your first appointment to get started with your healthcare journey.
                    </p>
                    <Button onClick={handleBookNewAppointment}>
                      <Plus className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Quick Actions & Health Stats */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-4 mb-8">
                <Button
                  className="w-full justify-start"
                  onClick={handleBookNewAppointment}
                >
                  <Plus className="h-4 w-4 mr-3" />
                  Book New Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-3" />
                  Medical Records
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Pill className="h-4 w-4 mr-3" />
                  Prescriptions
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Health Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-primary">
                      {appointments?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Appointments</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-medium">{thisMonthAppointments}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-medium">{completedAppointments}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Upcoming</span>
                      <span className="font-medium">{upcomingAppointments.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

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
