import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [lang, setLang] = useState('ar');

  return (
    <ScreenWrapper className="text-center">
      <div className="welcome-content">
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline mb-2">
          مرحباً بكم في نظام تسجيل الوصول الإلكتروني
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Welcome to the Electronic Check-in System
        </p>
        <div className="flex justify-center gap-2 mb-10">
          <Button
            onClick={() => setLang('ar')}
            variant={lang === 'ar' ? 'default' : 'outline'}
            className={cn("rounded-full px-6 py-3 font-bold transition-all duration-300", lang === 'ar' && "bg-primary text-primary-foreground scale-105 shadow-lg")}
          >
            العربية
          </Button>
          <Button
            onClick={() => setLang('en')}
            variant={lang === 'en' ? 'default' : 'outline'}
            className={cn("rounded-full px-6 py-3 font-bold transition-all duration-300", lang === 'en' && "bg-primary text-primary-foreground scale-105 shadow-lg")}
          >
            English
          </Button>
        </div>
        <Button
          onClick={onStart}
          size="xl"
          className="rounded-full font-bold btn-primary-gradient hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
            <span className="block leading-tight">ابدأ تسجيل الوصول</span>
            <span className="block leading-tight text-sm opacity-90">Start Check-in</span>
             <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
        </Button>
      </div>
    </ScreenWrapper>
  );
}
