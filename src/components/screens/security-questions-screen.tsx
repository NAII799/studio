"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScreenWrapper } from "../screen-wrapper";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { AlertCircle } from "lucide-react";

interface SecurityQuestionsScreenProps {
  onConfirm: () => void;
  onBack: () => void;
}

const securityQuestions = [
  { id: "q1", label: "هل قمت بتوضيب حقائبك بنفسك؟" },
  { id: "q2", label: "هل تركت حقائبك دون مراقبة منذ أن وضبتها؟" },
  { id: "q3", label: "هل تحمل أي مواد محظورة أو خطرة؟" },
  { id: "q4", label: "هل طلب منك أي شخص حمل شيء نيابة عنه؟" },
];

const formSchema = z.object({
  q1: z.boolean().refine(val => val === true, { message: "يجب الإجابة على هذا السؤال." }),
  q2: z.boolean().refine(val => val === false, { message: "لأسباب أمنية، لا يمكنك المتابعة إذا تركت أمتعتك دون مراقبة." }),
  q3: z.boolean().refine(val => val === false, { message: "لا يمكنك حمل مواد محظورة." }),
  q4: z.boolean().refine(val => val === false, { message: "لأسباب أمنية، لا يمكنك حمل أغراض لأشخاص آخرين." }),
}).transform(data => ({
    ...data,
    q2: !data.q2, // Inverting the logic for UI, but schema expects false
    q3: !data.q3,
    q4: !data.q4,
}));


export function SecurityQuestionsScreen({ onConfirm, onBack }: SecurityQuestionsScreenProps) {
    const form = useForm({
        resolver: zodResolver(z.object({
            q1: z.literal<boolean>(true, { errorMap: () => ({ message: 'يجب الموافقة على هذا البند' }) }),
            q2: z.literal<boolean>(true, { errorMap: () => ({ message: 'يجب الإقرار بأن أمتعتك لم تترك دون مراقبة' }) }),
            q3: z.literal<boolean>(true, { errorMap: () => ({ message: 'يجب الإقرار بعدم حمل مواد محظورة' }) }),
            q4: z.literal<boolean>(true, { errorMap: () => ({ message: 'يجب الإقرار بعدم حمل أغراض للغير' }) }),
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
        <h2 className="text-3xl font-bold text-primary font-headline">الأسئلة الأمنية</h2>
        <p className="text-muted-foreground">الرجاء الإجابة على الأسئلة التالية للمتابعة</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-right">
            <FormField
                control={form.control}
                name="q1"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
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
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>أقر بأنني لم أترك أمتعتي دون مراقبة.</FormLabel>
                             <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="q3"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>أقر بأنني لا أحمل أي مواد محظورة أو خطرة.</FormLabel>
                             <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="q4"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>أقر بأنه لم يطلب مني أي شخص حمل شيء نيابة عنه.</FormLabel>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />

          <div className="flex gap-4 justify-center pt-6">
            <Button type="submit" size="lg" className="font-bold btn-success-gradient">
              المتابعة
            </Button>
            <Button type="button" onClick={onBack} size="lg" variant="outline" className="font-bold">
              العودة
            </Button>
          </div>
        </form>
      </Form>
    </ScreenWrapper>
  );
}
