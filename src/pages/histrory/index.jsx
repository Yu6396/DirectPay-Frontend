import React from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, History as HistoryIcon, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const transactions = [
    {
      id: 1,
      type: 'wallet_funding',
      amount: 100,
      description: 'Transfer to John Doe',
      status: 'completed',
      created_at: "2022-01-01",
      reference: '1234567890',
    },
    {
      id: 2,
      type: 'bills_payment',
      amount: 50,
      description: 'Airtime TopUp',
      status: 'completed',
      created_at: "2022-01-01",
      reference: '1234567890',
    },
    {
      id: 3,
      type: 'wallet_funding',
      amount: 200,
      description: 'Transfer to Jane Doe',
      status: 'pending',
      created_at: "2022-01-01",
      reference: '1234567890',
    }
  ]

   const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-NG', options);
   }

   const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
   }

   const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'pending': return 'default';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
   }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <HistoryIcon className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Transaction History</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Your Transactions</h2>
            <p className="text-muted-foreground">View all your bill payments and wallet activities</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {transactions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <HistoryIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by making your first bill payment or funding your wallet
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold">{transaction.description || 'Transaction'}</h3>
                        <Badge variant={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Type: {transaction.type}
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        Reference: {transaction.reference || 'N/A'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        transaction.type === 'wallet_funding' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'wallet_funding' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>

  )
}

export default History