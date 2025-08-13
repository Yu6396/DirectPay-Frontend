import React , { useState} from 'react';
// import {  useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import Signin from '../signin';
import Signup from '../signup';

const Auth = () => {
  // const navigate = useNavigate()
 const [isActiveTab, setIsActiveTab] = useState('signin');


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