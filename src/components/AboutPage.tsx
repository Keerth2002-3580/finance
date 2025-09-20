import React from 'react';
import { Award, Users, Leaf, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onPageChange }) => {
  const milestones = [
    { year: '2020', event: 'Company Founded', description: 'NF Plantation established with government registration' },
    { year: '2021', event: 'First Plantation', description: '100 acres of aloe vera plantation started in Kilinochchi' },
    { year: '2022', event: '500+ Investors', description: 'Reached milestone of 500 satisfied investors' },
    { year: '2023', event: 'Expansion', description: 'Expanded to 500 acres with advanced farming techniques' }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'Transparency',
      description: 'Complete transparency in all our operations and investment processes'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Community',
      description: 'Supporting local farmers and creating sustainable employment'
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: 'Sustainability',
      description: 'Eco-friendly farming practices that protect our environment'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About NF Plantation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering sustainable aloe vera cultivation in Northern Sri Lanka while providing 
              exceptional returns to our valued investors.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                NF Plantation was founded in 2020 with a vision to revolutionize agricultural 
                investment in Sri Lanka. Based in the fertile lands of Kilinochchi, Northern 
                Province, we specialize in sustainable aloe vera cultivation.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our company is officially registered with the government (Registration Number: 00303425) 
                and operates under strict compliance with all regulatory requirements. We combine 
                traditional farming wisdom with modern agricultural techniques to ensure optimal yields.
              </p>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Government Registration</h3>
                <p className="text-gray-700">Registration Number: <strong>00303425</strong></p>
                <p className="text-gray-700">Licensed and regulated by Government of Sri Lanka</p>
              </div>
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

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600">
                To provide sustainable and profitable investment opportunities through 
                responsible aloe vera cultivation, while supporting local communities 
                and preserving the environment for future generations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600">
                To become Sri Lanka's leading agricultural investment company, known for 
                transparency, sustainability, and exceptional returns while contributing 
                to the economic development of Northern Province.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              Key milestones in our growth and success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="bg-green-600 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-2">{milestone.year}</div>
                  <h3 className="text-lg font-semibold mb-2">{milestone.event}</h3>
                  <p className="text-green-100 text-sm">{milestone.description}</p>
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Location */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Our Team & Location
              </h2>
              <p className="text-xl text-green-100 mb-6">
                Based in the heart of Northern Province, our experienced team of agricultural 
                experts and local farmers work together to ensure the success of every plantation.
              </p>
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-green-300 mr-3" />
                <span className="text-lg">Northern Province, Kilinochchi, Sri Lanka</span>
              </div>
              <p className="text-green-100">
                Our strategic location provides ideal climate conditions for aloe vera cultivation, 
                with experienced local farmers who understand the land and its potential.
              </p>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1627647212101-b9c08f46a7ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwd29ya2luZyUyMGdyZWVuJTIwZmllbGR8ZW58MXx8fHwxNzU4Mjc5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Farmers working in plantation"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join Our Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Become part of our growing community of successful investors and contribute 
            to sustainable agriculture in Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('investment')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Investment Plans
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};