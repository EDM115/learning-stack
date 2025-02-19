import Head from "next/head"
import { getGoals, getSessions } from "@/utils/api"
import { nunitoSans } from "@/utils/fonts"
import { Goal, Session } from "@/utils/types"
import Navbar from "@/components/navbar"
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

export async function getServerSideProps() {
  const sessions = await getSessions()
  const goals = await getGoals()
  
  sessions.forEach((session: Session) => {
    session.goals = session.goals.map((goalId) =>
      goals.find((goal) => goal.id === goalId)
    )
  })

  return {
    props: {
      sessions
    }
  }
}

export default function SessionsPage({ sessions }: { sessions: Session[] }) {
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
                    {session.goals
                      .filter((goal): goal is Goal => typeof goal !== "number")
                      .map((goal) => goal.goal)
                      .join(", ")}
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
