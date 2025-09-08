
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AirportHeader } from "./airport-header";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

interface SupervisorLoginProps {
  onLoginSuccess: () => void;
}

export function SupervisorLogin({ onLoginSuccess }: SupervisorLoginProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 500));

    const username = values.username.toUpperCase();
    if ((username === 'NAIF' || username === 'ADMIN') && values.password === '1212') {
      toast({
        title: "Login Successful",
        description: "Welcome, Supervisor.",
      });
      onLoginSuccess();
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid username or password.",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AirportHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Supervisor Login</CardTitle>
                <CardDescription>Enter your credentials to access the management panel.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                            <Input 
                                placeholder="Enter your username" 
                                {...field} 
                                className="h-11 text-base bg-input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input 
                                type="password"
                                placeholder="Enter your password" 
                                {...field} 
                                className="h-11 text-base bg-input"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="pt-4">
                        <Button 
                        type="submit" 
                        size="full"
                        disabled={isLoading}
                        className="font-bold btn-primary-gradient"
                        >
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                            <LogIn className="mr-2" />
                            Login
                            </>
                        )}
                        </Button>
                    </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
