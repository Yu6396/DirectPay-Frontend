import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowLeft,
  Zap,
  Smartphone,
  Tv,
  Droplets,
  GraduationCap,
  Wifi,
  Shield,
  Landmark,
} from "lucide-react";

const BillCategories = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  // const handleCategoryClick = (category) => {
  //   navigate(`/bills/${category}`);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DirectPay
              </h1>
              <Badge variant="secondary">Pay Bills</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Choose Bill Type</h2>
          <p className="text-lg text-muted-foreground">
            Select the type of bill you want to pay
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-muted rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4 mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {billCategories.map((category) => {
              const IconComponent = iconMap[category.icon_name];
              return (
                <Card
                  key={category.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  // onClick={() => handleCategorySelect(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-4 rounded-full bg-primary/10">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="mb-2 text-lg">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && billCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No bill categories available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Note */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="bg-muted/50">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This is a guest bill payment service.
              <br />
              <Button
                variant="link"
                className="p-0"
                onClick={() => navigate("/auth")}
              >
                Create an account
              </Button>{" "}
              to save payment history and enjoy additional features.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillCategories;
