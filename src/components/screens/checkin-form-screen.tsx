"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScreenWrapper } from "@/components/screen-wrapper";
import type { Passenger } from "@/lib/types";
import { AiExplainer } from "../common/ai-explainer";

const formSchema = z.object({
  passengerName: z.string().min(3, { message: "Name must be at least 3 characters." }),
  bookingRef: z.string().length(6, { message: "Booking reference must be 6 characters." }).transform(val => val.toUpperCase()),
});

interface CheckinFormScreenProps {
  onSearch: (data: z.infer<typeof formSchema>) => Promise<Passenger | null>;
  isLoading: boolean;
}

export function CheckinFormScreen({ onSearch, isLoading }: CheckinFormScreenProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengerName: "",
      bookingRef: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await onSearch(values);
  }

  return (
    <ScreenWrapper>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Passenger Check-in</h2>
        <p className="text-muted-foreground">Enter passenger name and booking reference (PNR) to proceed.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
          <FormField
            control={form.control}
            name="passengerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Passenger Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. John Doe" 
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
            name="bookingRef"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Booking Reference (PNR)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. RN4A7B" 
                    maxLength={6}
                    {...field} 
                    className="h-11 text-base font-mono tracking-widest uppercase bg-input"
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
                  <Search className="mr-2" />
                  Search Booking
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-8 border-t border-border pt-4 text-center">
         <AiExplainer step="checkinForm" />
      </div>
    </ScreenWrapper>
  );
}
