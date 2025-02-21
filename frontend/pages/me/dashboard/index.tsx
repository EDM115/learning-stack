import Head from "next/head"
import { getGoals, getNutrition, getSessions } from "@/utils/api"
import { getAuthToken } from "@/utils/cookies"
import { nunitoSans } from "@/utils/fonts"
import { Goal, Meal, Session } from "@/utils/types"
import Navbar from "@/components/navbar"
import { withAuth } from "@/utils/withAuth"

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from "@/components/ui/chart"
import { GetServerSidePropsContext } from "next"

export async function getServerSideProps(context: GetServerSidePropsContext | undefined) {
  const token = getAuthToken(context)
  
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  try {
    const sessions = await getSessions()
    const goals = await getGoals()
    const nutrition = await getNutrition()

    return {
      props: {
        sessions,
        goals,
        nutrition
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
}

function DashboardPage({ sessions, goals, nutrition }: { sessions: Session[], goals: Goal[], nutrition: Meal[] }) {
  const sessionsChartData = sessions.map((session) => {
    const date = new Date(session.date)
    const dayName = date.toLocaleDateString("fr-FR", { weekday: "long" }).charAt(0).toUpperCase() + date.toLocaleDateString("fr-FR", { weekday: "long" }).slice(1)
    return {
      day: `${dayName} ${date.toLocaleDateString("fr-FR")}`,
      calories: session.calories
    }
  })

  const sessionsChartConfig: ChartConfig = {
    calories: {
      label: "Calories dépensées",
      color: "var(--chart-1)"
    }
  }

  const goalsChartData = goals.map((goal) => ({
    goal: goal.title,
    calories: goal.calories
  }))

  const goalsChartConfig: ChartConfig = {
    calories: {
      label: "Calories",
      color: "var(--chart-2)"
    }
  }

  const nutritionChartData = [
    {
      key: "proteins",
      label: "Protéines",
      value: nutrition.reduce((acc, item) => acc + item.protein, 0)
    },
    {
      key: "carbs",
      label: "Glucides",
      value: nutrition.reduce((acc, item) => acc + item.carbs, 0)
    },
    {
      key: "fats",
      label: "Lipides",
      value: nutrition.reduce((acc, item) => acc + item.fat, 0)
    }
  ]

  const nutritionChartConfig: ChartConfig = {
    proteins: {
      label: "Protéines",
      color: "var(--chart-3)"
    },
    carbs: {
      label: "Glucides",
      color: "var(--chart-4)"
    },
    fats: {
      label: "Lipides",
      color: "var(--chart-5)"
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard - TrackFit</title>
        <meta
          name="description"
          content="Accédez à votre tableau de bord pour visualiser vos progrès."
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <h1>Dashboard</h1>
        <div className="w-full max-w-6xl p-4 shadow-md rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Séances</h2>
          <ChartContainer
            config={sessionsChartConfig}
            className="min-h-[200px] w-full"
          >
            <RechartsBarChart
              accessibilityLayer
              data={sessionsChartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="calories"
                fill="var(--color-calories)"
                radius={4}
              />
            </RechartsBarChart>
          </ChartContainer>
        </div>
        <div className="w-full max-w-6xl p-4 shadow-md rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Objectifs</h2>
          <ChartContainer
            config={goalsChartConfig}
            className="min-h-[200px] w-full"
          >
            <RechartsLineChart
              accessibilityLayer
              data={goalsChartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="goal"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
                padding={{ left: 40, right: 30 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey="calories"
                stroke="var(--color-calories)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </RechartsLineChart>
          </ChartContainer>
        </div>
        <div className="w-full max-w-6xl p-4 shadow-md rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nutrition</h2>
          <ChartContainer
            config={nutritionChartConfig}
            className="min-h-[200px] w-full"
          >
            <RechartsPieChart
              accessibilityLayer
              data={nutritionChartData}
            >
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                dataKey="value"
                data={nutritionChartData}
                label={({ label, value }) => `${label} : ${value}`}
              >
                {nutritionChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`var(--color-${entry.key})`}
                  />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </RechartsPieChart>
          </ChartContainer>
        </div>
      </main>
    </>
  )
}

export default withAuth(DashboardPage)
