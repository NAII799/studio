"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScreenWrapper } from "@/components/screen-wrapper";
import type { Passenger } from "@/lib/types";

const formSchema = z.object({
  passengerName: z.string().min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل." }),
  bookingRef: z.string().length(6, { message: "رقم الحجز يجب أن يتكون من 6 أحرف." }).transform(val => val.toUpperCase()),
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
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary font-headline mb-8">تسجيل الوصول - Check-in</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
          <FormField
            control={form.control}
            name="passengerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold text-primary">اسم المسافر / Passenger Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="أدخل الاسم الكامل" 
                    {...field} 
                    className="h-14 text-lg text-center rounded-xl focus:transform focus:-translate-y-1 transition-transform duration-300"
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
                <FormLabel className="text-lg font-bold text-primary">رقم الحجز / Booking Reference (PNR)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="أدخل رقم الحجز" 
                    maxLength={6}
                    {...field} 
                    className="h-14 text-lg text-center tracking-[0.2em] uppercase rounded-xl focus:transform focus:-translate-y-1 transition-transform duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            size="full"
            disabled={isLoading}
            className="font-bold btn-primary-gradient hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span className="btn-text">البحث عن الحجز</span>
                <span className="btn-text-en opacity-80 text-sm ml-2">/ Search Booking</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </ScreenWrapper>
  );
}
