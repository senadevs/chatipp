import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../lib/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chrome } from 'lucide-react';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthProps {
  mode?: 'login' | 'register';
}

export function Auth({ mode = 'login' }: AuthProps) {
  const { toast } = useToast();
  const { login, register, loginWithGoogle, loginDemo } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setLoading(true);
      if (mode === 'login') {
        await login(data.email, data.password);
        toast({
          title: 'Success',
          description: 'Successfully logged in',
        });
      } else {
        await register(data.email, data.password);
        toast({
          title: 'Success',
          description: 'Registration successful',
        });
      }
      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: mode === 'login' ? 'Failed to log in' : 'Failed to register',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to login with Google',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginDemo();
    window.location.href = '/';
  };

  return (
    <Card className="w-[350px] shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl">{mode === 'login' ? 'Login' : 'Register'}</CardTitle>
        <CardDescription>
          {mode === 'login'
            ? 'Enter your credentials to access your account'
            : 'Create a new account'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              {...registerForm('email')}
              className={`h-9 ${errors.email ? 'border-destructive' : ''}`}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm">Password</Label>
            <Input
              id="password"
              type="password"
              {...registerForm('password')}
              className={`h-9 ${errors.password ? 'border-destructive' : ''}`}
            />
            {errors.password && (
              <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="h-9"
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleDemoLogin}
              disabled={loading}
              className="h-9"
            >
              Try Demo
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button type="submit" className="w-full h-9" disabled={loading}>
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
          <div className="text-xs text-center space-y-2">
            <p className="text-muted-foreground">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <a href="/register" className="text-primary hover:underline">
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <a href="/login" className="text-primary hover:underline">
                    Sign in
                  </a>
                </>
              )}
            </p>
            <p className="text-muted-foreground">
              <a href="/chat" className="text-primary hover:underline">
                Continue as guest
              </a>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}