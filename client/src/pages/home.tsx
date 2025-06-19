import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/ui/animated-logo";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <AnimatedLogo />
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Sorin Tanasa, PhD
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up">
            Personal Connection Coach
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-12 animate-slide-up">
            Empowering individuals and communities to build meaningful connections, foster collaboration, and create lasting bonds through authentic communication and shared experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button 
              onClick={() => setLocation("/coaching")}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Explore Coaching
            </Button>
            <Button 
              variant="outline"
              onClick={() => setLocation("/community")}
              className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
            >
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
