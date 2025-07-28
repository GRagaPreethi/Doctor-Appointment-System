import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AppointmentWithDetails } from "@shared/schema";
import { Calendar, Clock, MapPin, Video, Phone } from "lucide-react";

interface AppointmentCardProps {
  appointment: AppointmentWithDetails;
  showPatientInfo?: boolean;
  onReschedule?: (appointment: AppointmentWithDetails) => void;
  onCancel?: (appointment: AppointmentWithDetails) => void;
  onApprove?: (appointment: AppointmentWithDetails) => void;
  onDecline?: (appointment: AppointmentWithDetails) => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const typeIcons = {
  "in-person": MapPin,
  video: Video,
  phone: Phone,
};

export function AppointmentCard({
  appointment,
  showPatientInfo = false,
  onReschedule,
  onCancel,
  onApprove,
  onDecline,
}: AppointmentCardProps) {
  const StatusIcon = typeIcons[appointment.type];

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              {showPatientInfo ? (
                <span className="text-lg font-semibold text-gray-600">
                  {appointment.patient.firstName[0]}{appointment.patient.lastName[0]}
                </span>
              ) : (
                <span className="text-lg font-semibold text-gray-600">
                  Dr
                </span>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                {showPatientInfo
                  ? `${appointment.patient.firstName} ${appointment.patient.lastName}`
                  : `Dr. ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`
                }
              </h4>
              <p className="text-sm text-gray-600">
                {showPatientInfo ? appointment.reason : appointment.doctor.specialization}
              </p>
            </div>
          </div>
          <Badge className={statusColors[appointment.status]}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-medium">{appointment.date}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-600">Time</p>
              <p className="font-medium">{appointment.time}</p>
            </div>
          </div>
          <div className="flex items-center">
            <StatusIcon className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-600">Type</p>
              <p className="font-medium capitalize">{appointment.type.replace("-", " ")}</p>
            </div>
          </div>
        </div>

        {appointment.notes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Notes:</strong> {appointment.notes}
            </p>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {appointment.status === "pending" && onApprove && onDecline && (
            <>
              <Button
                size="sm"
                onClick={() => onApprove(appointment)}
                className="bg-green-600 hover:bg-green-700"
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDecline(appointment)}
              >
                Decline
              </Button>
            </>
          )}
          
          {(appointment.status === "pending" || appointment.status === "confirmed") && onReschedule && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onReschedule(appointment)}
            >
              Reschedule
            </Button>
          )}
          
          {(appointment.status === "pending" || appointment.status === "confirmed") && onCancel && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCancel(appointment)}
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            >
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
