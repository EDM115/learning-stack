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
import { withAuth } from "@/utils/withAuth"

export async function getServerSideProps() {
  const sessions = await getSessions()
  const goals = await getGoals()
  
  sessions.forEach((session: Session) => {
    if (session.goals) {
      session.goals = session.goals
        .map((goalId) => goals.find((goal) => goal.id === goalId))
        .filter((goal): goal is Goal => goal !== undefined)
    }
  })

  return {
    props: {
      sessions
    }
  }
}

function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  let result = ""
  if (hours > 0) {
    result += `${hours} heure${hours > 1 ? "s" : ""}`
  }
  if (minutes > 0) {
    result += `${result ? " " : ""}${minutes} minute${minutes > 1 ? "s" : ""}`
  }
  return result
}

function SessionsPage({ sessions }: { sessions: Session[] }) {
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
                  <TableCell>
                  {(() => {
                    const date = new Date(session.date)
                    const dayName = date.toLocaleDateString("fr-FR", { weekday: "long" }).charAt(0).toUpperCase() + date.toLocaleDateString("fr-FR", { weekday: "long" }).slice(1)
                    return `${dayName} ${date.toLocaleDateString("fr-FR")}`
                  })()}
                  </TableCell>
                  <TableCell>{new Date(session.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</TableCell>
                  <TableCell>{formatDuration(session.duration)}</TableCell>
                  <TableCell>{session.calories}</TableCell>
                  <TableCell>
                    {(session.goals ?? [])
                      .filter((goal): goal is Goal => typeof goal !== "number")
                      .map((goal) => goal.title)
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

export default withAuth(SessionsPage)
