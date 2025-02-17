import Head from "next/head"
import { nunitoSans } from "@/utils/fonts"
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

export function getGoals() {
  return [
    {
      id: 1,
      goal: "Perdre du poids",
      duration: "3 mois",
      calories: 2000,
      weight: 70
    },
    {
      id: 2,
      goal: "Prise de masse",
      duration: "6 mois",
      calories: 2500,
      weight: 80
    },
    {
      id: 3,
      goal: "Séance cardio",
      duration: "1 mois",
      calories: 1500,
      weight: 75
    },
    {
      id: 4,
      goal: "Musculation",
      duration: "2 mois",
      calories: 1800,
      weight: 75
    }
  ]
}

function Goals() {
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
              {getGoals().map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>{goal.goal}</TableCell>
                  <TableCell>{goal.duration}</TableCell>
                  <TableCell>{goal.calories}</TableCell>
                  <TableCell>{goal.weight}</TableCell>
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

export default Goals
