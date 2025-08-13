import React from 'react'
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Shield, 
  Clock, 
  Smartphone, 
  CreditCard, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

// import { useAuth } from '@/contexts/AuthContext';
const Landing = () => {
  const navigate = useNavigate();


  const features = [
    {
      icon: Zap,
      title: "Instant Payments",
      description: "Pay your bills instantly with our lightning-fast payment system"
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Bank-level security to protect your transactions and personal data"
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Pay your bills anytime, anywhere, even on weekends and holidays"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Optimized for mobile devices for convenient on-the-go payments"
    }
  ];

  const billTypes = [
    "Electricity (NEPA, Ikeja Electric, Eko Electric)",
    "Internet & Data (MTN, Airtel, Glo, 9mobile)",
    "Cable TV (DStv, GOtv, StarTimes)",
    "Mobile Airtime Top-up",
    "Water Bills",
    "School Fees & Education",
    "Insurance Payments",
    "Government Services"
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DirectPay
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Pay All Your Bills
            <br />
            <span className="text-foreground">In One Place</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            DirectPay is Nigeria's most trusted bills payment platform. 
            Pay electricity, internet, cable TV, airtime and more with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => navigate('/auth')}>
              Start Paying Bills
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose DirectPay?</h3>
            <p className="text-lg text-muted-foreground">Experience the easiest way to pay bills in Nigeria</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className='text-center mb-12'>
            <h3 className="text-3xl font-bold mb-4">Supported Bill Payments</h3>
            <p className="text-lg text-muted-foreground">Pay all major bills across Nigeria</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {billTypes.map((bill, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className='text-sm'>{bill}</span>

              </div>
              
            ))}

          </div>

        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3  className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p  className="text-xl mb-8 opacity-90">Join thousands of Nigerians who trust DirectPay for their bill payments</p>
          <Button size="lg" 
            variant="secondary" 
            className="text-lg px-8"
            onClick={() => navigate('/auth')}>Create Free Account <ArrowRight className="ml-2 h-5 w-5" /></Button>

        </div>
      </section>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-white/80 border-t">
        <div className="max-w-7xl mx-auto text-center">
          <div className="items-center justify-center space-x-3 mb-4">
              <h4 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
    
              DirectPay
            </h4>
            <p className="text-sm text-muted-foreground">© 2024 DirectPay. All rights reserved. Making bill payments easier for Nigerians.</p>


          </div>
        </div>
      </footer>
     


    </div>
  )
  
}

export default Landing
