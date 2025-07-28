import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentCard } from "@/components/appointment-card";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { AppointmentWithDetails, Doctor } from "@shared/schema";
import { Calendar, Clock, Users, BarChart3, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: doctor } = useQuery<Doctor>({
    queryKey: ["/api/doctors/user", user?.id],
    enabled: !!user?.id && user?.role === "doctor",
    queryFn: async () => {
      const response = await fetch(`/api/doctors/user/${user?.id}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch doctor");
      return response.json();
    },
  });

  const { data: appointments, isLoading } = useQuery<AppointmentWithDetails[]>({
    queryKey: ["/api/appointments/doctor", doctor?.id],
    enabled: !!doctor?.id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ appointmentId, status }: { appointmentId: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/appointments/${appointmentId}/status`, {
        status,
      });
      return response.json();
    },
    onSuccess: (_, { status }) => {
      const message = status === "confirmed" ? "Appointment approved!" : "Appointment declined.";
      toast({
        title: "Success",
        description: message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update appointment status.",
        variant: "destructive",
      });
    },
  });

  if (!user || user.role !== "doctor") {
    setLocation("/");
    return null;
  }

  const pendingAppointments = appointments?.filter((apt) => apt.status === "pending") || [];
  const todaysAppointments = appointments?.filter((apt) => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today;
  }) || [];
  const completedToday = todaysAppointments.filter((apt) => apt.status === "completed").length;
  const remainingToday = todaysAppointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "pending"
  ).length;

  const handleApproveAppointment = (appointment: AppointmentWithDetails) => {
    updateStatusMutation.mutate({ appointmentId: appointment.id, status: "confirmed" });
  };

  const handleDeclineAppointment = (appointment: AppointmentWithDetails) => {
    updateStatusMutation.mutate({ appointmentId: appointment.id, status: "cancelled" });
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
              Good morning, Dr. {user.firstName}!
            </h1>
            <p className="text-gray-600 mt-2">Here's your schedule for today</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Appointment Requests */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Appointment Requests</h2>
              
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
              ) : pendingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {pendingAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      showPatientInfo={true}
                      onApprove={handleApproveAppointment}
                      onDecline={handleDeclineAppointment}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      All caught up!
                    </h3>
                    <p className="text-gray-600">
                      No pending appointment requests at the moment.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Doctor Stats & Quick Actions */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary">
                      {todaysAppointments.length}
                    </div>
                    <div className="text-sm text-gray-600">Today's Appointments</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-medium text-green-600">{completedToday}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Remaining</span>
                      <span className="font-medium text-blue-600">{remainingToday}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pending Requests</span>
                      <span className="font-medium text-yellow-600">{pendingAppointments.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-3" />
                  Manage Availability
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-3" />
                  Patient History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Reports
                </Button>
              </div>

              {/* Additional Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Patients</span>
                      <span className="font-medium">{appointments?.length || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-medium">
                        {appointments?.filter(apt => {
                          const appointmentDate = new Date(apt.date);
                          const now = new Date();
                          return appointmentDate.getMonth() === now.getMonth() &&
                                 appointmentDate.getFullYear() === now.getFullYear();
                        }).length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-medium">{doctor?.rating || "4.0"} ⭐</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
