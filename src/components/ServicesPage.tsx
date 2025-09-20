import React from 'react';
import { Leaf, TrendingUp, Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServicesPageProps {
  onPageChange: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onPageChange }) => {
  const services = [
    {
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      title: 'Aloe Vera Plantation Management',
      description: 'Professional cultivation and management of aloe vera crops with optimal growing conditions and expert care.',
      features: ['Organic farming methods', 'Regular monitoring', 'Quality assurance', 'Sustainable practices']
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-600" />,
      title: 'Investment Management',
      description: 'Comprehensive investment portfolio management with transparent reporting and guaranteed returns.',
      features: ['Monthly return payments', 'Transparent reporting', 'Risk management', 'Portfolio tracking']
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: 'Legal & Compliance',
      description: 'All operations are backed by government registration and full regulatory compliance.',
      features: ['Government registered', 'Legal documentation', 'Regulatory compliance', 'Investor protection']
    },
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: 'Investor Support',
      description: 'Dedicated support team to assist investors with queries and provide regular updates.',
      features: ['24/7 support', 'Regular updates', 'Personal consultation', 'Educational resources']
    }
  ];

  const process = [
    {
      step: '1',
      title: 'Registration',
      description: 'Create your account and complete the verification process'
    },
    {
      step: '2',
      title: 'Investment',
      description: 'Choose your investment amount (minimum LKR50,000)'
    },
    {
      step: '3',
      title: 'Plantation Allocation',
      description: 'Your investment is allocated to specific aloe vera plantation plots'
    },
    {
      step: '4',
      title: 'Monthly Returns',
      description: 'Receive guaranteed monthly returns directly to your account'
    },
    {
      step: '5',
      title: 'Principal Return',
      description: 'Get your full principal amount back after 3 years'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive investment solutions backed by sustainable aloe vera cultivation 
              and government registration.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our Investment Model Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, transparent process from registration to receiving returns
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-green-300"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aloe Vera Project Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Aloe Vera Plantation Project
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our aloe vera plantation project is strategically located in Kilinochchi, 
                Northern Province, where the climate and soil conditions are ideal for 
                aloe vera cultivation.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sustainable Farming</h4>
                    <p className="text-gray-600">Eco-friendly practices that preserve soil health and biodiversity</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Management</h4>
                    <p className="text-gray-600">Experienced agricultural team with deep local knowledge</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Market Demand</h4>
                    <p className="text-gray-600">Growing demand for aloe vera in pharmaceutical and cosmetic industries</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Community Impact</h4>
                    <p className="text-gray-600">Supporting local farmers and creating employment opportunities</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onPageChange('investment')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                View Investment Plans
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718653763578-361e60a5323b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMHBsYW50YXRpb24lMjBmYXJtfGVufDF8fHx8MTc1ODI3OTU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Aloe vera plantation"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Government Support */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Government Support & Legal Backing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our operations are fully compliant with Sri Lankan regulations and backed by government registration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Official Registration
              </h3>
              <p className="text-gray-600">
                Company registered with Government of Sri Lanka (Reg. No: 00303425)
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Regulatory Compliance
              </h3>
              <p className="text-gray-600">
                Full compliance with investment and agricultural regulations
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Investor Protection
              </h3>
              <p className="text-gray-600">
                Legal framework protecting investor rights and interests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join our community of successful investors and benefit from our sustainable 
            aloe vera plantation project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('register')}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};