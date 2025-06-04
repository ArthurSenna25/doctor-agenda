"use client";

import "dayjs/locale/pt-br";

import dayjs from "dayjs";

dayjs.locale("pt-br");
import { DollarSign, Info } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrencyInCents } from "@/helpers/currency";

interface DailyAppointment {
  date: string;
  appointments: number;
  revenue: number | null;
}

interface AppointmentsChartProps {
  dailyAppointmentsData: DailyAppointment[];
}

const AppointmentsChart = ({
  dailyAppointmentsData,
}: AppointmentsChartProps) => {
  // Gerar 21 dias: 10 antes + hoje + 10 depois
  const chartDays = Array.from({ length: 21 }).map((_, i) =>
    dayjs()
      .subtract(10 - i, "days")
      .format("YYYY-MM-DD"),
  );

  const chartData = chartDays.map((date) => {
    const dataForDay = dailyAppointmentsData.find((item) => item.date === date);
    return {
      date: dayjs(date).format("DD/MM"),
      fullDate: date,
      appointments: dataForDay?.appointments || 0,
      revenue: Number(dataForDay?.revenue || 0),
    };
  });

  const chartConfig = {
    appointments: {
      label: "Agendamentos",
      color: "#0B68F7",
    },
    revenue: {
      label: "Faturamento",
      color: "#10B981",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
        <CardTitle className="text-sm sm:text-base">
          Agendamentos e Faturamento
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden px-2 sm:px-6">
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
          <Info className="h-3 w-3 flex-shrink-0" />
          <span>
            Exibindo dados dos últimos 10 dias, hoje e próximos 10 dias
          </span>
        </div>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full overflow-hidden sm:min-h-[300px]"
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 15,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              fontSize={10}
              className="sm:text-xs"
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              fontSize={10}
              className="sm:!mr-2 sm:text-xs"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              fontSize={10}
              className="sm:!ml-2 sm:text-xs"
              tickFormatter={(value) => formatCurrencyInCents(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-auto max-w-[280px] sm:max-w-none"
                  formatter={(value, name) => {
                    if (name === "revenue") {
                      return (
                        <>
                          <div className="h-3 w-3 rounded bg-[#10B981]" />
                          <span className="text-muted-foreground text-xs sm:text-sm">
                            Faturamento:
                          </span>
                          <span className="text-xs font-semibold sm:text-sm">
                            {formatCurrencyInCents(Number(value))}
                          </span>
                        </>
                      );
                    }
                    return (
                      <>
                        <div className="h-3 w-3 rounded bg-[#0B68F7]" />
                        <span className="text-muted-foreground text-xs sm:text-sm">
                          Agendamentos:
                        </span>
                        <span className="text-xs font-semibold sm:text-sm">
                          {value}
                        </span>
                      </>
                    );
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return dayjs(payload[0].payload?.fullDate).format(
                        "DD/MM/YYYY (dddd)",
                      );
                    }
                    return label;
                  }}
                />
              }
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="appointments"
              stroke="var(--color-appointments)"
              fill="var(--color-appointments)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              fill="var(--color-revenue)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AppointmentsChart;
