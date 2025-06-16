import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useLocation } from "wouter";

const services = [
  {
    title: "Effective Meetings",
    description: "Transform your meetings from time-wasters into powerful collaboration sessions. Learn facilitation techniques, agenda design, and engagement strategies that drive results and leave participants energized.",
    features: [
      "Meeting facilitation mastery",
      "Agenda design & time management", 
      "Participant engagement techniques"
    ],
  },
  {
    title: "Community Building",
    description: "Create thriving communities that bring out the best in people. Master the art of fostering authentic connections, designing inclusive spaces, and nurturing sustainable community growth.",
    features: [
      "Community vision & strategy",
      "Inclusive environment design",
      "Sustainable growth methods"
    ],
  },
  {
    title: "Tea Mastery",
    description: "Discover the profound wisdom of tea ceremony as a pathway to mindful leadership and deeper connections. Learn ancient practices that cultivate presence, patience, and authentic relating.",
    features: [
      "Traditional ceremony techniques",
      "Mindfulness & presence practice",
      "Leadership through ritual"
    ],
  },
];

export default function Coaching() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Coaching Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your relationships and leadership skills with personalized coaching designed to create lasting impact.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Service Image Placeholder</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="text-accent mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <Button 
                    onClick={() => setLocation("/contact")}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Book a complimentary discovery session to explore how coaching can transform your relationships and leadership impact.
          </p>
          <Button 
            onClick={() => setLocation("/contact")}
            className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            Schedule Discovery Session
          </Button>
        </div>
      </div>
    </div>
  );
}
