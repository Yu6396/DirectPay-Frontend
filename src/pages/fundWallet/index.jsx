import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Labels } from '../../components/ui/labels';
import { ArrowLeft, Wallet, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FundWallet = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFundWallet = async (e) => {
    e.preventDefault();
    setLoading(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <Wallet className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Fund Wallet</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add Money to Wallet</span>
            </CardTitle>
            <CardDescription>
              Enter the amount you want to add to your wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFundWallet} className="space-y-6">
              <div className="space-y-2">
                <Labels htmlFor="amount">Amount (NGN)</Labels>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Quick Amounts</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[1000, 5000, 10000].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                    >
                      ₦{quickAmount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is a demo. In a real application, 
                  you would be redirected to a secure payment gateway.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !amount}
              >
                {loading ? 'Processing...' : `Fund Wallet with ₦${amount ? parseFloat(amount).toLocaleString() : '0'}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundWallet;