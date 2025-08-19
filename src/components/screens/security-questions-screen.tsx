"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScreenWrapper } from "../screen-wrapper";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { AlertCircle } from "lucide-react";

interface SecurityQuestionsScreenProps {
  onConfirm: () => void;
  onBack: () => void;
}

const securityQuestions = [
  { id: "q1", label: "Have you packed your bags yourself?" },
  { id: "q2", label: "Have you left your bags unattended since packing them?" },
  { id: "q3", label: "Are you carrying any prohibited or dangerous goods?" },
  { id: "q4", label: "Has anyone asked you to carry anything on their behalf?" },
];

export function SecurityQuestionsScreen({ onConfirm, onBack }: SecurityQuestionsScreenProps) {
    const form = useForm({
        resolver: zodResolver(z.object({
            q1: z.literal<boolean>(true, { errorMap: () => ({ message: 'You must agree to this item.' }) }),
            q2: z.literal<boolean>(true, { errorMap: () => ({ message: 'You must acknowledge your bags were not left unattended.' }) }),
            q3: z.literal<boolean>(true, { errorMap: () => ({ message: 'You must acknowledge you are not carrying prohibited items.' }) }),
            q4: z.literal<boolean>(true, { errorMap: () => ({ message: 'You must acknowledge you are not carrying items for others.' }) }),
        })),
        defaultValues: {
            q1: false,
            q2: false,
            q3: false,
            q4: false,
        },
    });

  const onSubmit = () => {
    onConfirm();
  };

  return (
    <ScreenWrapper className="max-w-2xl">
      <div className="text-center mb-8">
        <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-primary font-headline">Security Questions</h2>
        <p className="text-muted-foreground">Please answer the following questions to continue.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="q1"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4 bg-secondary/30">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none text-left">
                            <FormLabel>{securityQuestions[0].label}</FormLabel>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="q2"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4 bg-secondary/30">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none text-left">
                            <FormLabel>I acknowledge my baggage has not been left unattended.</FormLabel>
                             <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="q3"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4 bg-secondary/30">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none text-left">
                            <FormLabel>I acknowledge I am not carrying any prohibited or dangerous goods.</FormLabel>
                             <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="q4"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4 bg-secondary/30">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none text-left">
                            <FormLabel>I acknowledge I have not been asked to carry anything for another person.</FormLabel>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />

          <div className="flex gap-4 justify-center pt-6">
             <Button type="button" onClick={onBack} size="lg" variant="outline" className="font-bold bg-secondary">
              Back
            </Button>
            <Button type="submit" size="lg" className="font-bold btn-success-gradient">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </ScreenWrapper>
  );
}
