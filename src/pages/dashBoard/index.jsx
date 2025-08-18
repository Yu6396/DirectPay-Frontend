import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Wallet,
  Zap,
  Wifi,
  Tv,
  Smartphone,
  Droplets,
  GraduationCap,
  Shield,
  Landmark,
  Plus,
  History,
  Settings,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";

const iconMap = {
  zap: Zap,
  wifi: Wifi,
  tv: Tv,
  smartphone: Smartphone,
  droplets: Droplets,
  "graduation-cap": GraduationCap,
  shield: Shield,
  landmark: Landmark,
};

const API_URL = "https://directpay-hcgw.onrender.com/api/v1/user";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }

    // Decode token to get email / user_id
    let decoded = null;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/auth");
    }

    // Fetch user info
    axios
      .get(`${API_URL}/get-user-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data?.data || null);
        localStorage.setItem("user", JSON.stringify(res.data?.data));
      })
      .catch((err) => {
        console.error("Error fetching user", err);
        navigate("/auth");
      });

    // Fetch wallet
    axios
      .get(`${API_URL}/get-user-wallet`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWallet(res.data?.data || null))
      .catch(() => {
        setWallet({ balance: 0, currency: "NGN" });
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const formatCurrency = (amount, currency = "NGN") =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
    }).format(amount);

  // const getInitials = (first_name, last_name, email) => {
  //   if (first_name || last_name) {
  //     return `${first_name?.[0] || ""}${last_name?.[0] || ""}`.toUpperCase();
  //   }
  //   return email?.[0]?.toUpperCase() || "U";
  // };

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const billCategories = [
    {
      id: 1,
      name: "Mobile Airtime",
      description: "Top up your mobile phone",
      icon_name: "smartphone",
    },
    {
      id: 2,
      name: "Electricity",
      description: "Electricity bill payments",
      icon_name: "zap",
    },
    {
      id: 3,
      name: "Internet",
      description: "Internet and Data Subscription",
      icon_name: "wifi",
    },
    {
      id: 4,
      name: "TV",
      description: "Cable and Satellite TV Subscription",
      icon_name: "tv",
    },
    {
      id: 5,
      name: "Education",
      description: "School fees and educational payment",
      icon_name: "graduation-cap",
    },
    {
      id: 6,
      name: "Government",
      description: "Government services and taxes",
      icon_name: "landmark",
    },
    {
      id: 7,
      name: "Water",
      description: "Water bill payments",
      icon_name: "droplets",
    },
    {
      id: 8,
      name: "Insurance",
      description: "Insurance premiums payments",
      icon_name: "shield",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DirectPay
              </h1>
              <Badge variant="secondary">Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage />
                <AvatarFallback>
                  {getInitials(
                    user?.first_name || user?.last_name
                      ? `${user?.first_name || ""} ${
                          user?.last_name || ""
                        }`.trim()
                      : user?.email || "U"
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">
                  {user?.first_name || user?.last_name
                    ? `${"hello" || ""} ${
                        user?.first_name || ""
                      }`.trim().toUpperCase()
                    : user?.email || "User"}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="h-6 w-6" />
                <CardTitle className="text-white">My Wallet</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20"
              >
                {showBalance ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-3xl font-bold">
                  {showBalance
                    ? formatCurrency(
                        wallet?.balance || 0,
                        wallet?.currency || "NGN"
                      )
                    : "****"}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/fund-wallet")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Fund Wallet
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2"
              onClick={() => navigate("/history")}
            >
              <History className="h-5 w-5" />
              <span className="text-xs">History</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2"
              onClick={() => navigate("/fund-wallet")}
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs">Fund Wallet</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs">Settings</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-2"
              onClick={() => navigate("/security")}
            >
              <Shield className="h-5 w-5" />
              <span className="text-xs">Security</span>
            </Button>
          </div>
        </div>

        {/* Bill Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Pay Bills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {billCategories.map((category) => {
              const Icon = iconMap[category.icon_name] || Zap;

              return (
                <Card
                  key={category.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/pay-bill/${category.id}`)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mb-2">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest bill payments and wallet activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No transactions yet</p>
              <p className="text-sm">Start by paying your first bill!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
