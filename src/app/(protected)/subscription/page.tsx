import { Check, Star } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface SubscriptionPlanProps {
  planName: string;
  planDescription: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
  active: boolean;
  userEmail: string;
  className?: string;
  highlighted?: boolean;
}

function SubscriptionPlan({
  planName,
  planDescription,
  price,
  period,
  features,
  buttonText,
  buttonVariant = "default",
  active,
  className,
  highlighted = false,
}: SubscriptionPlanProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        highlighted && "border-blue-200 shadow-xl",
        active && "ring-2 ring-blue-500 ring-offset-2",
        className,
      )}
    >
      {active && (
        <Badge className="absolute top-4 right-4 bg-green-100 text-green-800 hover:bg-green-100">
          <Star className="mr-1 h-3 w-3" />
          Ativo
        </Badge>
      )}

      <CardHeader className="pb-4 text-center">
        <CardTitle
          className={cn("text-2xl font-bold", highlighted && "text-blue-600")}
        >
          {planName}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {planDescription}
        </CardDescription>
        <div className="mt-4">
          <span
            className={cn("text-4xl font-bold", highlighted && "text-blue-600")}
          >
            {price}
          </span>
          <span className="text-muted-foreground ml-1">/ {period}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                highlighted
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600",
              )}
            >
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
          variant={buttonVariant}
          className={cn(
            "w-full font-semibold",
            highlighted &&
              buttonVariant === "default" &&
              "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          )}
          disabled={active && buttonText === "Gerenciar assinatura"}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Escolha seu Plano</PageTitle>
          <PageDescription>
            Selecione o plano ideal para sua clínica e comece a transformar seu
            atendimento hoje mesmo.
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Plano Básico */}
          <div className="relative">
            <SubscriptionPlan
              planName="Básico"
              planDescription="Ideal para consultórios pequenos"
              price="R$39"
              period="mês"
              features={[
                "Cadastro de até 1 médico",
                "Até 50 agendamentos/mês",
                "Cadastro de pacientes",
                "Suporte via e-mail",
              ]}
              buttonText="Começar Grátis"
              buttonVariant="outline"
              active={false}
              userEmail={session.user.email}
              className="h-full"
            />
          </div>

          {/* Plano Essential - Mais Popular */}
          <div className="relative">
            <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform">
              <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                Mais Popular
              </span>
            </div>
            <SubscriptionPlan
              planName="Essential"
              planDescription="Para profissionais autônomos ou pequenas clínicas"
              price="R$59"
              period="mês"
              features={[
                "Cadastro de até 3 médicos",
                "Agendamentos ilimitados",
                "Métricas básicas",
                "Cadastro de pacientes",
                "Confirmação manual",
                "Suporte via e-mail",
                "Relatórios mensais",
              ]}
              buttonText="Gerenciar assinatura"
              buttonVariant="default"
              active={session.user.plan === "essential"}
              userEmail={session.user.email}
              className="h-full scale-105 border-2 border-blue-200 shadow-xl"
              highlighted={true}
            />
          </div>

          {/* Plano Premium */}
          <div className="relative md:col-span-2 lg:col-span-1">
            <SubscriptionPlan
              planName="Premium"
              planDescription="Para clínicas médias e grandes"
              price="R$99"
              period="mês"
              features={[
                "Médicos ilimitados",
                "Agendamentos ilimitados",
                "Métricas avançadas",
                "Cadastro de pacientes",
                "Confirmação automática",
                "Suporte prioritário",
                "Relatórios personalizados",
                "Integração com WhatsApp",
                "Backup automático",
              ]}
              buttonText="Fazer Upgrade"
              buttonVariant="outline"
              active={session.user.plan === "premium"}
              userEmail={session.user.email}
              className="h-full"
            />
          </div>
        </div>

        {/* Seção de Garantia e Benefícios */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:from-blue-950/20 dark:to-purple-950/20">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Por que escolher nossa plataforma?
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  Garantia de 30 dias
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Teste sem riscos por 30 dias
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <svg
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  Setup em minutos
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure sua clínica rapidamente
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <svg
                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  Suporte 24/7
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Estamos sempre aqui para ajudar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ ou Informações Adicionais */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tem dúvidas? Entre em contato conosco pelo{" "}
            <a
              href="mailto:suporte@clinica.com"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              suporte@clinica.com
            </a>
          </p>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default SubscriptionPage;
