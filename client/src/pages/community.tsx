import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeft, Users, Lightbulb, MessageSquare, Clock, MapPin, Calendar } from "lucide-react";

const communities = [
  {
    title: "IdeaVerse",
    description: "A creative hub where innovators, entrepreneurs, and dreamers come together to transform ideas into reality. We foster collaboration through monthly ideation sessions, peer mentoring, and project partnerships.",
    features: "Monthly meetups • Online community • Mentorship programs",
    expandedDescription: "IdeaVerse is more than just a community—it's a launchpad for transformative ideas. Our members include startup founders, creative professionals, and visionary thinkers who believe in the power of collaboration to change the world.",
    details: [
      "Monthly Innovation Sessions where members pitch ideas and receive feedback",
      "Peer Mentorship Program pairing experienced entrepreneurs with newcomers",
      "Project Partnership Platform for finding collaborators",
      "Resource Library with templates, guides, and tools for ideation",
      "Demo Days where members showcase their progress and celebrate wins"
    ],
    stats: {
      members: "200+ Active Members",
      events: "24 Events This Year",
      projects: "50+ Projects Launched"
    }
  },
  {
    title: "Agora Network",
    description: "A professional network dedicated to meaningful dialogue and knowledge sharing. We believe in the power of authentic conversations to drive innovation and create lasting professional relationships.",
    features: "Weekly discussions • Expert panels • Leadership workshops",
    expandedDescription: "Named after the ancient Greek marketplace of ideas, Agora Network brings together professionals who value deep, meaningful conversations over superficial networking. Our community thrives on intellectual curiosity and genuine connection.",
    details: [
      "Weekly Discussion Circles on topics ranging from leadership to industry trends",
      "Expert Panel Series featuring thought leaders and industry pioneers",
      "Leadership Development Workshops with hands-on learning",
      "Mastermind Groups for peer coaching and accountability",
      "Annual Summit bringing together the brightest minds in our network"
    ],
    stats: {
      members: "150+ Professionals",
      discussions: "Weekly Sessions",
      experts: "30+ Industry Leaders"
    }
  },
  {
    title: "Chinese Tea Ceremony",
    description: "A contemplative practice that brings people together through the ritual of tea. This ancient tradition teaches patience, mindfulness, and the art of being fully present with others in shared moments of tranquility.",
    features: "Weekly ceremonies • Mindfulness training • Cultural exchange",
    expandedDescription: "Through the ancient art of Gongfu Cha (Chinese tea ceremony), we explore how ritual and mindfulness can deepen our connections with others and ourselves. This practice offers a refuge from our fast-paced world and teaches us the value of presence.",
    details: [
      "Traditional Gongfu Cha ceremony instruction with authentic tea sets",
      "Mindfulness and Meditation practices integrated with tea preparation",
      "Cultural Education about Chinese tea traditions and philosophy",
      "Seasonal Tea Tastings featuring rare and artisanal teas",
      "Community Garden where we grow our own tea herbs and plants"
    ],
    stats: {
      ceremonies: "Weekly Gatherings",
      tradition: "1000+ Years Old",
      varieties: "20+ Tea Types"
    }
  },
];

export default function Community() {
  const [, setLocation] = useLocation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex(index);
  };

  const handleCollapse = () => {
    setExpandedIndex(null);
  };

  if (expandedIndex !== null) {
    const community = communities[expandedIndex];
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <Button 
              onClick={handleCollapse}
              variant="ghost"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Communities
            </Button>
          </div>
          
          <div className={`${
            expandedIndex === 0 ? 'animate-slide-in-left' : 
            expandedIndex === 2 ? 'animate-slide-in-right' : 
            'animate-slide-in-center'
          }`}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{community.title}</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {community.expandedDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-8">
                <Card className="bg-white rounded-2xl shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">What We Offer</h3>
                    <ul className="space-y-4">
                      {community.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <span className="text-gray-600 leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <div className="w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Community Image Placeholder</span>
                </div>
                
                <Card className="bg-white rounded-2xl shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Community Stats</h3>
                    <div className="space-y-4">
                      {Object.entries(community.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-primary font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={() => setLocation("/contact")}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 mr-4"
              >
                Join {community.title}
              </Button>
              <Button 
                onClick={handleCollapse}
                variant="outline"
                className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
              >
                View All Communities
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <Card 
              key={index} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                expandedIndex === null ? 'animate-fade-in' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Community Image Placeholder</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{community.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {community.description}
                </p>
                <div className="pt-4 border-t border-gray-100 mb-4">
                  <span className="text-sm text-accent font-medium">{community.features}</span>
                </div>
                <Button
                  onClick={() => handleExpand(index)}
                  variant="outline"
                  className="w-full text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  More
                </Button>
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
