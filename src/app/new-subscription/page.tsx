import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "../(protected)/subscription/_components/subscription-plan";

export default async function NewSubscriptionPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
      <div className="mb-12 w-full max-w-4xl text-center">
        <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl leading-tight font-bold text-transparent sm:text-4xl lg:text-5xl">
          Desbloqueie todo o potencial da sua clínica
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
          Para continuar utilizando nossa plataforma e transformar a gestão do
          seu consultório, é necessário escolher um plano que se adapte às suas
          necessidades.
        </p>
        <div className="mb-8 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
          <p className="text-base font-medium text-blue-800 sm:text-lg">
            🚀{" "}
            <span className="font-semibold">
              Profissionais que utilizam nossa plataforma economizam em média 15
              horas por semana
            </span>{" "}
            em tarefas administrativas. Não perca mais tempo com agendas manuais
            e processos ineficientes!
          </p>
        </div>
      </div>

      <div className="mb-12 w-full max-w-md lg:max-w-lg">
        <SubscriptionPlan userEmail={session.user.email} />
      </div>

      <div className="max-w-2xl text-center">
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
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
            <h3 className="mb-1 font-semibold text-gray-900">
              Garantia 30 dias
            </h3>
            <p className="text-sm text-gray-600">Teste sem riscos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
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
            <h3 className="mb-1 font-semibold text-gray-900">Setup rápido</h3>
            <p className="text-sm text-gray-600">Pronto em minutos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mb-1 font-semibold text-gray-900">
              2.000+ clínicas
            </h3>
            <p className="text-sm text-gray-600">Confiam em nós</p>
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-gray-500">
          Junte-se a mais de 2.000 profissionais de saúde que já transformaram
          sua rotina com nossa solução. Garantia de satisfação de 30 dias ou seu
          dinheiro de volta.
        </p>

        <p className="text-xs text-gray-400">
          Tem dúvidas? Entre em contato:{" "}
          <a
            href="mailto:sennaa.dev@gmail.com"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            sennaa.dev@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
