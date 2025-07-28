import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { DoctorWithUser } from "@shared/schema";

interface DoctorsSectionProps {
  onBookWithDoctor: (doctor: DoctorWithUser) => void;
}

const doctorImages = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
];

export function DoctorsSection({ onBookWithDoctor }: DoctorsSectionProps) {
  const { data: doctors, isLoading } = useQuery<DoctorWithUser[]>({
    queryKey: ["/api/doctors"],
  });

  if (isLoading) {
    return (
      <section id="doctors" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Doctors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced healthcare professionals ready to provide you with the best medical care
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-1/2 mx-auto"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="doctors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Doctors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced healthcare professionals ready to provide you with the best medical care
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors?.map((doctor, index) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={doctorImages[index % doctorImages.length]}
                alt={`Dr. ${doctor.user.firstName} ${doctor.user.lastName}`}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Dr. {doctor.user.firstName} {doctor.user.lastName}
              </h3>
              <p className="text-primary text-center mb-3">{doctor.specialization}</p>
              <p className="text-gray-600 text-sm text-center mb-4">
                {doctor.experience} years experience
              </p>
              <div className="flex justify-center items-center mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {doctor.rating} ({doctor.reviewCount} reviews)
                </span>
              </div>
              <Button
                className="w-full"
                onClick={() => onBookWithDoctor(doctor)}
              >
                Book Appointment
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
