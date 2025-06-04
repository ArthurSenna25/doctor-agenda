"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Check, Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SubscriptionPlanProps {
  active?: boolean;
  className?: string;
  userEmail: string;
}

export function SubscriptionPlan({
  active = false,
  className,
  userEmail,
}: SubscriptionPlanProps) {
  const router = useRouter();
  const createStripeCheckoutAction = useAction(createStripeCheckout, {
    onSuccess: async ({ data }) => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key not found");
      }
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );
      if (!stripe) {
        throw new Error("Stripe not found");
      }
      if (!data?.sessionId) {
        throw new Error("Session ID not found");
      }
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
  });

  const features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via e-mail",
  ];

  const handleSubscribeClick = () => {
    createStripeCheckoutAction.execute();
  };

  const handleManagePlanClick = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${userEmail}`,
    );
  };

  return (
    <div className="relative pt-6">
      {!active && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform">
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            Mais Popular
          </span>
        </div>
      )}
      <Card
        className={cn(
          "relative overflow-hidden border-blue-200 shadow-xl transition-all duration-300 hover:shadow-lg",
          !active && "scale-105",
          active && "ring-2 ring-green-500 ring-offset-2",
          className,
        )}
      >
        {active && (
          <Badge className="absolute top-4 right-4 bg-green-100 text-green-800 hover:bg-green-100">
            <Star className="mr-1 h-3 w-3" />
            Ativo
          </Badge>
        )}

        <CardHeader className="pt-8 pb-4 text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">
            Essential
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Para profissionais autônomos ou pequenas clínicas
          </CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold text-blue-600">R$59</span>
            <span className="text-muted-foreground ml-1">/ mês</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Check className="h-3 w-3" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </div>
          ))}
        </CardContent>

        <CardFooter className="pt-6">
          <Button
            className={cn(
              "w-full font-semibold",
              active
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
            )}
            onClick={active ? handleManagePlanClick : handleSubscribeClick}
            disabled={createStripeCheckoutAction.isExecuting}
          >
            {createStripeCheckoutAction.isExecuting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : active ? (
              "Gerenciar assinatura"
            ) : (
              "Começar Agora"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
