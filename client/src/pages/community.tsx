import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

const communities = [
  {
    title: "IdeaVerse",
    description: "A creative hub where innovators, entrepreneurs, and dreamers come together to transform ideas into reality. We foster collaboration through monthly ideation sessions, peer mentoring, and project partnerships.",
    features: "Monthly meetups • Online community • Mentorship programs",
  },
  {
    title: "Agora Network",
    description: "A professional network dedicated to meaningful dialogue and knowledge sharing. We believe in the power of authentic conversations to drive innovation and create lasting professional relationships.",
    features: "Weekly discussions • Expert panels • Leadership workshops",
  },
  {
    title: "Chinese Tea Ceremony",
    description: "A contemplative practice that brings people together through the ritual of tea. This ancient tradition teaches patience, mindfulness, and the art of being fully present with others in shared moments of tranquility.",
    features: "Weekly ceremonies • Mindfulness training • Cultural exchange",
  },
];

export default function Community() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Community</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the vibrant communities I'm proud to be part of, each fostering connection and growth in unique ways.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <Card key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Community Image Placeholder</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{community.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {community.description}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-sm text-accent font-medium">{community.features}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            onClick={() => setLocation("/contact")}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Join Our Communities
          </Button>
        </div>
      </div>
    </div>
  );
}
