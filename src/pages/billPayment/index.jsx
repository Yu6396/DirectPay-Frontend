// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Button } from '../../components/ui/Button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
// import { Input } from '../../components/ui/Input';
// import { Labels } from '../../components/ui/labels';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';
// import { ArrowLeft, Zap, CreditCard, AlertCircle } from 'lucide-react';

// const BillProvider= [{
//   id: 1,
//   name: "DStv",
//   code: "DSTV",
//   description: "DStv Subscription",
//   service_charge: 100,
//   category_id: 1
// },
// {
//   id: 2,
//   name: "GOTV",
//   code: "GOTV",
//   description: "GOTV Subscription",
//   service_charge: 100,
//   category_id: 1
// },
// {
//   id: 3,
//   name: "Startimes",
//   code: "STARTIMES",
//   description: "Startimes Subscription",
//   service_charge: 100,
//   category_id: 1
// },
// {
//   id: 4,
//   name: "Mtn Airtime",
//   code: "MTN_AIRTIME",
//   description: "MTN Airtime",
//   service_charge: 100,
//   category_id: 2
// },
// {
//   id: 5,
//   name: "Glo Airtime",
//   code: "GLO_AIRTIME",
//   description: "GLO Airtime",
//   service_charge: 100,
//   category_id: 2
// },
// {
//   id: 6,
//   name: "Airtel Airtime",
//   code: "AIRTEL_AIRTIME",
//   description: "AIRTEL Subscription",
//   service_charge: 100,
//   category_id: 2
// },
// {
//     id:5,
//     name:"MTN Data",
//     code:"MTN_DATA",
//     description:"MTN Data",
//     service_charge:100,
//     category_id:3
// },
// {
//     id: 6,
//     name: "Eko Electric",
//     code: "EKEDC",
//     description: "Eko Electric",
//     service_charge: 100,
//     category_id: 4
// },
// {
//     id: 7,
//     name: "Ikeja Electric",
//     code: "IKEJA",
//     description: "Ikeja Electric",
//     service_charge: 100,
//     category_id: 4
// },

// ]

// const BillCategory=[
//     {
//     id: 1,
//     name: "Mobile Airtime",
//     description: "Top up your mobile phone",
//   },
//   {
//     id: 2,
//     name: "Electricity",
//     description: "Electricity bill payments",
//   },
//   {
//     id: 3,
//     name: "Internet",
//     description: "Internet and Data Subscription",
//   },
//   {
//     id: 4,
//     name: "TV",
//     description: "Cable and Satellite TV Subscription",
//   },
//   {
//     id: 5,
//     name: "Education",
//     description: "School fees and educational payment",
//   },
//   {
//     id: 6,
//     name: "Government",
//     description: "Government services and taxes",
//   },
//   {
//     id: 7,
//     name: "Water",
//     description: "Water bill payments",
//   },
//   {
//     id: 8,
//     name: "Insurance",
//     description: "Insurance premiums payments",
//   },
//   ]

// const BillPayment = () => {
//   const { categoryId } = useParams();
//   const navigate = useNavigate();
  
//   const [selectedProvider, setSelectedProvider] = useState<string>('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [wallet, setWallet] = useState<{ balance: number } | null>(null);

  

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
//       <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center h-16 space-x-4">
//             <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
//               <ArrowLeft className="h-4 w-4" />
//             </Button>
//             <div className="flex items-center space-x-3">
//               <Zap className="h-6 w-6 text-primary" />
//               <h1 className="text-xl font-semibold">Pay {category?.name} Bill</h1>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <CreditCard className="h-5 w-5" />
//               <span>Bill Payment</span>
//             </CardTitle>
//             <CardDescription>
//               {category?.description}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handlePayment} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="provider">Service Provider</Label>
//                 <Select value={selectedProvider} onValueChange={setSelectedProvider}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a provider" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {providers.map((provider) => (
//                       <SelectItem key={provider.id} value={provider.id}>
//                         {provider.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="account">Account Number/Meter Number</Label>
//                 <Input
//                   id="account"
//                   type="text"
//                   placeholder="Enter account number"
//                   value={accountNumber}
//                   onChange={(e) => setAccountNumber(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="amount">Amount (NGN)</Label>
//                 <Input
//                   id="amount"
//                   type="number"
//                   placeholder="0.00"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   min="1"
//                   step="0.01"
//                   required
//                 />
//               </div>

//               {selectedProviderData && amount && (
//                 <div className="bg-muted/50 p-4 rounded-lg space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Amount:</span>
//                     <span>₦{parseFloat(amount).toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Service Charge:</span>
//                     <span>₦{selectedProviderData.service_charge.toLocaleString()}</span>
//                   </div>
//                   <hr />
//                   <div className="flex justify-between font-semibold">
//                     <span>Total:</span>
//                     <span>₦{totalAmount.toLocaleString()}</span>
//                   </div>
//                 </div>
//               )}

//               {wallet && totalAmount > wallet.balance && (
//                 <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-start space-x-2">
//                   <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
//                   <div>
//                     <p className="text-sm text-red-800 font-medium">Insufficient Balance</p>
//                     <p className="text-xs text-red-700">
//                       Your wallet balance (₦{wallet.balance.toLocaleString()}) is insufficient for this payment.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <Button 
//                 type="submit" 
//                 className="w-full" 
//                 disabled={loading || !selectedProvider || !accountNumber || !amount || (wallet && totalAmount > wallet.balance)}
//               >
//                 {loading ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default BillPayment;