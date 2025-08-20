import React , { useState, useEffect} from 'react';
// import {  useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import Signin from '../signin';
import Signup from '../signup';
import { useNavigate } from "react-router-dom";

import { Button } from '../../components/ui/Button';

  

  const API_URL = "https://directpay-hcgw.onrender.com/auth";

const Auth = () => {
 
 const [isActiveTab, setIsActiveTab] = useState('signin');
   const [loading, setLoading] = useState(false);



  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(`${API_URL}/google/callback`);
      window.location.href = `${API_URL}/google`;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className= "w-full max-w-md">
         <CardHeader className="text-center" >
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" >
            DirectPay
          </CardTitle>
          <CardDescription>
            Nigeria's leading bills payment platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isActiveTab} onValueChange={setIsActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup">
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <Signin />
            </TabsContent>
            <TabsContent value="signup">
              <Signup />
            </TabsContent>
          </Tabs>
           <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
           <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
        </CardContent>
       
      </Card>
    </div>
    
  )
}

export default Auth


{/* <div>
      <h1>{tabList[tab]}</h1>

      {
        tabList.map((data,index) => (
          <h1 className={tab === index ? "bg-red-500" : ""} key={index} onClick={() =>  handleTab(index)}>
            {data}
          </h1>
        ))
      }

{
  componentList[tab]
}

    </div> */}