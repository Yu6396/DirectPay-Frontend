import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Labels } from '../../components/ui/Labels';
import { ArrowLeft, Shield, Lock, Key, LogOut, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Security = () => {
  const navigate = useNavigate();
  
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const user = {
    name: 'Abayomi Obayemi',
    email: 'twodot40@gmail.com',
    email_confirmed_at: '2023-06-01',
    phone_confirmed_at: '2023-06-01',
  }

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
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
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Security</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Change Password</span>
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Labels htmlFor="current">Current Password</Labels>
                  <Input
                    id="current"
                    type="password"
                    placeholder="Enter current password"
                    // value={passwords.current}
                    onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Labels htmlFor="new">New Password</Labels>
                  <Input
                    id="new"
                    type="password"
                    placeholder="Enter new password"
                    // value={passwords.new}
                    onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Labels htmlFor="confirm">Confirm New Password</Labels>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="Confirm new password"
                    // value={passwords.confirm}
                    onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                    required
                    minLength={6}
                  />
                </div>

                <Button type="submit" variant="default">
                  <Key className="h-4 w-4 mr-2" />
                  {/* {loading ? 'Updating...' : 'Update Password'} */}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Information */}
          <Card>
            <CardHeader>
              <CardTitle>Security Information</CardTitle>
              <CardDescription>
                View your account security details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Account Security</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Email: {user?.email}</p>
                  <p>Email Verified: {user?.email_confirmed_at ? 'Yes' : 'No'}</p>
                  <p>Phone Verified: {user?.phone_confirmed_at ? 'Yes' : 'No'}</p>
                  <p>Two-Factor Authentication: Not enabled</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Security Tips</h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Use a strong, unique password</li>
                      <li>• Don't share your account credentials</li>
                      <li>• Sign out from public devices</li>
                      <li>• Keep your contact information updated</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LogOut className="h-5 w-5" />
                <span>Session Management</span>
              </CardTitle>
              <CardDescription>
                Manage your active sessions and sign out options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Current Session</h4>
                  <p className="text-sm text-muted-foreground">
                    Last activity: {new Date().toLocaleString()}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  This Device
                </Button>
              </div>

              <div className="border-t pt-4">
                <Button 
                  variant="destructive" 
                  // onClick={handleSignOutAll}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out from All Devices
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This will sign you out from all devices and you'll need to sign in again
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                <p className="text-sm text-red-700 mb-3">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" disabled>
                  Delete Account (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Security;