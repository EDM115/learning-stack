import Head from "next/head"
import { nunitoSans } from "@/utils/fonts"
import Navbar from "@/components/navbar"
import { getGoals } from "../goals"
import { Plus } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function getSessions() {
  const goals = getGoals()

  return [
    {
      id: 1,
      day: "Lundi 10/02/2025",
      time: "18h30",
      duration: "1h",
      calories: 300,
      goals: [goals.find((goal) => goal.id === 2)]
    },
    {
      id: 2,
      day: "Mercredi 12/02/2025",
      time: "18h30",
      duration: "1h",
      calories: 500,
      goals: [goals.find((goal) => goal.id === 3)]
    },
    {
      id: 3,
      day: "Vendredi 14/02/2025",
      time: "18h30",
      duration: "1h",
      calories: 400,
      goals: [goals.find((goal) => goal.id === 4)]
    }
  ]
}

function Sessions() {
  const sessions = getSessions()

  return (
    <>
      <Head>
        <title>Mes séances - TrackFit</title>
        <meta
          name="description"
          content="Consultez vos séances d'entraînement."
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <h1>
          Mes séances
          <Button className="ml-4">
            <Plus />
            Ajouter une séance
          </Button>
        </h1>
        <div className="w-full max-w-4xl p-4 shadow-md rounded-lg">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Jour</TableHead>
                <TableHead>Heure</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Calories dépensées</TableHead>
                <TableHead>Objectifs atteints</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session, index) => (
                <TableRow key={index}>
                  <TableCell>{session.day}</TableCell>
                  <TableCell>{session.time}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>{session.calories}</TableCell>
                  <TableCell>
                    {session.goals.map((goal) => goal?.goal).join(", ")}
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

export default Sessions
