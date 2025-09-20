import React from 'react';
import { Shield, TrendingUp, FileCheck, ArrowRight, Leaf } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  
  onPageChange: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Government Approved',
      description: 'Registered and approved investment company with legal backing'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: 'High Returns',
      description: 'Up to 4% monthly returns in the third year of investment'
    },
    {
      icon: <FileCheck className="w-8 h-8 text-green-600" />,
      title: 'Transparent Process',
      description: 'Clear investment terms and regular updates on your portfolio'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Investors' },
    { number: '2Cr+', label: 'Total Investment' },
    { number: '3-4%', label: 'Monthly Returns' },
    { number: '100%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1718653763578-361e60a5323b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMHBsYW50YXRpb24lMjBmYXJtfGVufDF8fHx8MTc1ODI3OTU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="w-16 h-16 text-green-400 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold">
                NF Plantation
              </h1>
            </div>
            
            {/* Tamil Slogan */}
            <div className="mb-8">
              <p className="text-xl md:text-2xl mb-4" style={{ fontFamily: 'serif' }}>
                High returns for short-term investment in a government-
              </p>
              <p className="text-xl md:text-2xl" style={{ fontFamily: 'serif' }}>
                approved investment company
              </p>
            </div>

            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Invest in sustainable aloe vera plantation with government backing and earn high monthly returns
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onPageChange('investment')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center"
              >
                Start Investing
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => onPageChange('about')}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NF Plantation?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to transparency, government approval, and sustainable farming 
              practices makes us the trusted choice for your investment needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-lg text-green-600 mb-3" style={{ fontFamily: 'serif' }}>
                    
                  </p>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunity Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sustainable Aloe Vera Investment
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our aloe vera plantation project combines environmental sustainability 
                with profitable returns. Located in the fertile Northern Province of 
                Kilinochchi, our farms are managed by experienced local farmers.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Government registered (Reg. No: 00303425)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Experienced farming team</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Sustainable and eco-friendly practices</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Regular monitoring and updates</span>
                </div>
              </div>
              <button
                onClick={() => onPageChange('services')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn How It Works
              </button>
            </div>
            <div className="lg:pl-8">
              <ImageWithFallback
              src="https://imgs.search.brave.com/TaIBITbN5_LIyeLhxfi529l1LlEwpylS_cZYaqA9aaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA5/NjgvNTM4NC9maWxl/cy9CZXN0LXNvaWwt/Zm9yLWFsb2UtdmVy/YS1qcGpfMTIwMHg2/MDAuanBnP3Y9MTcy/MDUyOTc0Mg"
              alt="Aloe vera plantation"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied investors who are earning consistent returns 
            through our sustainable aloe vera plantation project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('investment')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View Investment Plans
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};