import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { InvestmentPlansPage } from './components/InvestmentPlansPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './components/DashboardPage';
import { AdminPage } from './components/AdminPage';
import { AdminSetup } from './components/AdminSetup';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'about':
        return <AboutPage onPageChange={setCurrentPage} />;
      case 'services':
        return <ServicesPage onPageChange={setCurrentPage} />;
      case 'investment':
        return <InvestmentPlansPage onPageChange={setCurrentPage} />;
      case 'contact':
        return <ContactPage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      case 'register':
        return <RegisterPage onPageChange={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage onPageChange={setCurrentPage} />;
      case 'admin':
        return <AdminPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Header currentPage={currentPage} onPageChange={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">NF</span>
                  </div>
                  <h3 className="text-xl font-bold">NF Plantation</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Sustainable aloe vera investment opportunities with government backing 
                  and guaranteed returns.
                </p>
                <p className="text-sm text-gray-500">
                  Reg. No: 00303425
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setCurrentPage('about')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => setCurrentPage('services')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setCurrentPage('investment')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Investment Plans
                  </button>
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Investment Info</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Minimum Investment: ₹50,000</p>
                  <p>Investment Period: 3 Years</p>
                  <p>Monthly Returns: 3-4%</p>
                  <p>Government Approved</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact Info</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Northern Province, Kilinochchi</p>
                  <p>Phone: +94 76 018 4807</p>
                  <p>Email: info@nfplantation.lk</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setCurrentPage('register')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Start Investing
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 NF Plantation. All rights reserved.</p>
              <p className="mt-2 text-sm">
                Licensed and regulated investment company specializing in sustainable agriculture.
              </p>
            </div>
          </div>
        </footer>
        
        {/* Admin Setup - for demo purposes */}
        <AdminSetup />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}