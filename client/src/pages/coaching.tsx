import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowLeft, Users, Clock, Target, Award, BookOpen, Coffee } from "lucide-react";
import { useLocation } from "wouter";

interface ServiceData {
  title: string;
  description: string;
  expandedDescription: string;
  details: string[];
  features?: string[];
  outcomes?: string[];
  duration?: string;
  format?: string;
  investment?: string;
  image: string;
}

const services: ServiceData[]= [

  {
    title: "Effective Meetings",
    description: "Transform your meetings from time-wasters into powerful collaboration sessions. Learn facilitation techniques, agenda design, and engagement strategies that drive results and leave participants energized.",
    features: [
      "Meeting facilitation mastery",
      "Agenda design & time management", 
      "Participant engagement techniques"
    ],
    expandedDescription: "In today's fast-paced world, meetings can either be the catalyst for breakthrough collaboration or the biggest drain on productivity. Through my Effective Meetings coaching, you'll master the art and science of leading sessions that people actually want to attend.",
    details: [
    "A time when everyone spoke one language, helping them build a great civilization able of building soaring towers. That is, until divine intervention caused them to speak different tongues, bringing their civilization to it's knees.",
    "This isn't just a mythical story; it's an allegory of human communication: we speak and listen to build things together, but constantly misunderstandings get in the way of connection and progress.",
    "With over five years as a Toastmaster and countless philosophical discussions, I've dedicated myself to understanding this challenge.",
    "Through this journey, I've perfected a communication framework that minimizes misunderstandings, ensuring you and your team work in harmony on any project."
    ],
    outcomes: [
      "Reduce meeting time by 30% while increasing productivity",
      "Create psychological safety for authentic participation",
      "Master the art of reading room dynamics and adjusting accordingly",
      "Build consensus efficiently without sacrificing diverse perspectives"
    ],
    duration: "8-week program",
    format: "1-on-1 or small group sessions",
    investment: "Custom pricing based on scope",
    image: "/images/meeting.png"
  },
  {
    title: "Community Building",
    description: "Create thriving communities that bring out the best in people. Master the art of fostering authentic connections, designing inclusive spaces, and nurturing sustainable community growth.",
    features: [
      "Community vision & strategy",
      "Inclusive environment design",
      "Sustainable growth methods"
    ],
    expandedDescription: "Building a community is more than gathering people—it's about creating a living ecosystem where relationships flourish and collective wisdom emerges. My Community Building approach focuses on sustainable growth that honors both individual needs and collective purpose.",
    details: [
    "Becoming your true self has been marketed as a the new mark of success, your victory over the despotism of social conformity.",
    "The result: billions of lonely people begging for attention on social media and dating apps, selling their individuality for likes and buying things to impress others.",
    "Many people are waking up to understand they need to know others at least as much as they need to know themselves.",
    "Seeing this, I went on a journey to discover and apply everything I could to help people connect: with each other, with their ideas and with the traditions that created them.",
    "Today I help people create and manage their communities, by sharing the secrets that helped me create and manage a community of purpose in Prague."
    ],
    outcomes: [
      "Design community structures that scale authentically",
      "Create rituals and traditions that deepen member connection",
      "Learn from your diverse abackgroudn and skilled members",
      "Build resilient communities that thrive through challenges"
    ],
    duration: "12-week intensive",
    format: "Group workshops + individual mentoring",
    investment: "Sliding scale available",
    image: "/images/community.png"
  },
  {
    title: "Tea Mastery",
    description: "Discover the profound wisdom of tea ceremony as a pathway to mindful leadership and deeper connections. Learn ancient practices that cultivate presence, patience, and authentic relating.",
    features: [
      "Traditional ceremony techniques",
      "Mindfulness & presence practice",
      "Leadership through ritual"
    ],
    expandedDescription: "The way of tea is the way of presence. Through the ancient practice of Gongfu Cha, discover how slowing down and creating sacred space can transform your leadership style and deepen your capacity for authentic connection with others.",
    details: [
    "Discovering the intricate art of hosting a Chinese tea ceremony, a practice rich in history and philosophical depth.",
    "This course will guide you through the elegant traditions of Gongfu Cha, focusing on its philosophy, technique, and hosting etiquette.",
    "Beyond the technical skills of brewing tea, we'll explore how this ritual cultivates mindfulness and connection.",
    "This course is suitable for people looking to connect more with the present moment and who have an appreciation of the meaning of leading through service."
    ],
    outcomes: [
      "Develop unshakeable presence and centeredness under pressure",
      "Create meaningful ritual in your professional and personal life",
      "Master the art of deep listening and authentic response",
      "Use tea ceremony as a unique differentiator in your leadership approach"
    ],
    duration: "6-month journey",
    format: "Monthly in-person ceremonies + online support",
    investment: "Includes all tea and equipment",
    image: "/images/tea.png"
  },
];

export default function Coaching() {
  const [, setLocation] = useLocation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex(index);
  };

  const handleCollapse = () => {
    setExpandedIndex(null);
  };

  if (expandedIndex !== null) {
    const service = services[expandedIndex];
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
              Back to Services
            </Button>
          </div>
          
          <div className={`${
            expandedIndex === 0 ? 'animate-slide-in-left' : 
            expandedIndex === 2 ? 'animate-slide-in-right' : 
            'animate-slide-in-center'
          }`}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{service.title}</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {service.expandedDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-8">
                <Card className="bg-gray-50 rounded-2xl shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <BookOpen className="mr-3 text-primary" size={24} />
                      Imagine
                    </h3>
                    <div className="space-y-4">
                      {service.details.map((detail, index) => (
                        <p key={index} className="text-gray-600 leading-relaxed">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50 rounded-2xl shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <Target className="mr-3 text-accent" size={24} />
                      Key Outcomes
                    </h3>
                    <ul className="space-y-3">
                      {service.outcomes?.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="text-accent mr-3 mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-600 leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <div className="w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                <Card className="bg-gray-50 rounded-2xl shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <Clock className="mr-3 text-indigo-500" size={24} />
                      Program Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">Duration</span>
                        <span className="text-primary font-semibold">{service.duration}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">Format</span>
                        <span className="text-primary font-semibold">{service.format}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Investment</span>
                        <span className="text-primary font-semibold">{service.investment}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center space-y-4">
                  <Button 
                    onClick={() => setLocation("/contact")}
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Schedule Discovery Call
                  </Button>
                  <p className="text-sm text-gray-500">
                    Free 30-minute consultation to discuss your goals
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={handleCollapse}
                variant="outline"
                className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 mr-4"
              >
                View All Services
              </Button>
              <Button 
                onClick={() => setLocation("/contact")}
                className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Coaching Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <i>'The highest good is like water.<br/>
            Water benefits all things and does not compete.<br/>
            It stays in the lowly places that others disdain.<br/>                
            Therefore it is close to the Tao.'<br/></i>
            <br/>
            Lao Tzu, Tao Te Ching (on leadership), Chapter 8.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                expandedIndex === null ? 'animate-fade-in' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {service.features?.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="text-accent mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
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
