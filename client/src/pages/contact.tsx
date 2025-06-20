import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Icon } from "@iconify/react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message sent!",
        description: data.message,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-6 py-5">
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardContent className="p-4">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a topic..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coaching">Individual Coaching</SelectItem>
                      <SelectItem value="community">Community Building</SelectItem>
                      <SelectItem value="meetings">Meeting Facilitation</SelectItem>
                      <SelectItem value="tea">Tea Ceremony</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    className="mt-2 resize-none"
                    placeholder="Tell me about what you're looking for..."
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
                >
                  {contactMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:message" className="mr-2" width={16} height={16} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Connect With Me</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:email" className="text-primary" width={20} height={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">tanasa.sorin@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:clock" className="text-accent" width={20} height={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Response Time</p>
                      <p className="text-gray-600">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:calendar" className="text-indigo-500" width={20} height={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Availability</p>
                      <p className="text-gray-600">Monday - Friday, 9AM - 6PM PST</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Social Media Links */}
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Follow & Connect</h3>
                <div >
                  <a href="https://wa.me/qr/SEBKB7CWC6NWB1" className="flex items-center space-x-4 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:whatsapp" className="text-green-500" width={20} height={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-600">Quick messaging & voice calls</p>
                    </div>
                  </a>
                  
                  <a href="https://www.linkedin.com/in/sorin-tanasa/" className="flex items-center space-x-4 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:linkedin" className="text-blue-600" width={20} height={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">LinkedIn</p>
                      <p className="text-sm text-gray-600">Professional updates & articles</p>
                    </div>
                  </a>
                  
                  <a href="https://www.meetup.com/members/191312989/" className="flex items-center space-x-4 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:account-multiple" className="text-red-500" width={20} height={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Meetup.com</p>
                      <p className="text-sm text-gray-600">Join our local events</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
