import { Calendar, UserCheck, Shield, Clock, Smartphone, Heart } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book appointments with your preferred doctors in just a few clicks. View available slots and choose what works best for you.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: UserCheck,
    title: "Expert Doctors",
    description: "Connect with certified and experienced doctors across various specializations. Quality healthcare at your fingertips.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is protected with enterprise-grade security. Complete privacy and compliance with healthcare standards.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support to help you with any queries. We're here whenever you need assistance.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access your appointments and health records from any device. Fully responsive design for seamless experience.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Heart,
    title: "Health Tracking",
    description: "Keep track of your health history, prescriptions, and upcoming appointments all in one convenient place.",
    color: "bg-red-100 text-red-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MediCare?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience healthcare like never before with our comprehensive appointment management system
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${feature.color}`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
