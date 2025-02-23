import Head from "next/head"
import { getGoals } from "@/utils/api"
import { nunitoSans } from "@/utils/fonts"
import { Goal } from "@/utils/types"
import Navbar from "@/components/navbar"
import { Pencil, Plus, X } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { withAuth } from "@/utils/withAuth"

export async function getServerSideProps() {
  const goals = await getGoals()

  return {
    props: {
      goals
    }
  }
}

function formatDuration(duration: number) {
  const months = Math.floor(duration / 30)
  const weeks = Math.floor((duration % 30) / 7)
  const days = duration % 7

  if (months > 0) {
    return `${months} mois`
  } else if (weeks > 0) {
    return `${weeks} semaines`
  } else {
    return `${days} jours`
  }
}

function GoalsPage({ goals }: { goals: Goal[] }) {
  return (
    <>
      <Head>
        <title>Mes objectifs - TrackFit</title>
        <meta
          name="description"
          content="Définissez vos objectifs et suivez vos progrès."
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <h1>
          Mes objectifs
          <Button className="ml-4">
            <Plus /> Ajouter un objectif
          </Button>
        </h1>
        <div className="w-full max-w-4xl p-4 shadow-md rounded-lg">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Objectif</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Poids</TableHead>
                <TableHead>Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>{goal.title}</TableCell>
                  <TableCell>{formatDuration(goal.duration)}</TableCell>
                  <TableCell>{goal.calories} kCal</TableCell>
                  <TableCell>{goal.weight} kg</TableCell>
                  <TableCell>
                    <Button size="icon">
                      <Pencil />
                    </Button>
                    <Button
                      size="icon"
                      className="ml-2"
                      variant="destructive"
                    >
                      <X />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  )
}

export default withAuth(GoalsPage)
