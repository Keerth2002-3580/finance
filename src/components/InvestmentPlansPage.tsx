import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react';

interface InvestmentPlansPageProps {
  onPageChange: (page: string) => void;
}

export const InvestmentPlansPage: React.FC<InvestmentPlansPageProps> = ({ onPageChange }) => {
  const [calculatorAmount, setCalculatorAmount] = useState<number>(100000);

  const investmentPlans = [
    { amount: 50000, year1: 1500, year2: 1750, year3: 2000 },
    { amount: 100000, year1: 3000, year2: 3500, year3: 4000 },
    { amount: 200000, year1: 6000, year2: 7000, year3: 8000 },
    { amount: 500000, year1: 15000, year2: 17500, year3: 20000 },
    { amount: 1000000, year1: 30000, year2: 35000, year3: 40000 },
    { amount: 2000000, year1: 60000, year2: 70000, year3: 80000 },
    { amount: 5000000, year1: 150000, year2: 175000, year3: 200000 },
  ];

  const calculateReturns = (amount: number) => {
    return {
      year1Monthly: (amount * 0.03),
      year1Yearly: (amount * 0.03) * 12,
      year2Monthly: (amount * 0.035),
      year2Yearly: (amount * 0.035) * 12,
      year3Monthly: (amount * 0.04),
      year3Yearly: (amount * 0.04) * 12,
      totalReturns: ((amount * 0.03) * 12) + ((amount * 0.035) * 12) + ((amount * 0.04) * 12)
    };
  };

  const calculatedReturns = calculateReturns(calculatorAmount);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our structured investment plans with guaranteed monthly returns. 
            Our progressive return structure ensures growing income over time.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Progressive Returns</h3>
            <p className="text-gray-600">Returns increase from 3% to 4% monthly over 3 years</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fixed Duration</h3>
            <p className="text-gray-600">3-year investment period with guaranteed returns</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Payouts</h3>
            <p className="text-gray-600">Regular monthly income directly to your account</p>
          </div>
        </div>

        {/* Investment Calculator */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <Calculator className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Investment Calculator</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Amount (LKR)
              </label>
              <input
                type="number"
                value={calculatorAmount}
                onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                min="50000"
                step="10000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter amount"
              />
              <p className="text-sm text-gray-500 mt-2">
                Minimum investment: LKR50,000
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Returns</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Year 1 (3% monthly):</span>
                  <span className="font-semibold">{formatCurrency(calculatedReturns.year1Monthly)}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year 2 (3.5% monthly):</span>
                  <span className="font-semibold">{formatCurrency(calculatedReturns.year2Monthly)}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year 3 (4% monthly):</span>
                  <span className="font-semibold">{formatCurrency(calculatedReturns.year3Monthly)}/month</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total 3-Year Returns:</span>
                    <span className="font-bold text-green-600">{formatCurrency(calculatedReturns.totalReturns)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Plans Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Available Investment Plans</h2>
            <p className="text-gray-600 mt-2">All amounts are in Srilankan Rupees (LKR)</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Investment Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Year 1 (3% Monthly)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Year 2 (3.5% Monthly)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Year 3 (4% Monthly)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Total 3-Year Returns
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {investmentPlans.map((plan, index) => {
                  const returns = calculateReturns(plan.amount);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {formatCurrency(plan.amount)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {formatCurrency(returns.year1Monthly)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {formatCurrency(returns.year2Monthly)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {formatCurrency(returns.year3Monthly)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {formatCurrency(returns.totalReturns)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Terms & Conditions</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Minimum investment amount: LKR50,000</li>
            <li>• Investment period: 3 years (36 months)</li>
            <li>• Monthly returns are credited on the 1st of each month</li>
            <li>• Principal amount is returned at the end of 3 years</li>
            <li>• All investments are backed by aloe vera plantation assets</li>
            <li>• Government registered company (Reg. No: 00303425)</li>
            <li>• Early withdrawal may incur penalties as per agreement</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-green-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Investing?</h2>
          <p className="text-lg mb-6 text-green-100">
            Join our growing community of investors and start earning monthly returns today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('register')}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Register Now
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};