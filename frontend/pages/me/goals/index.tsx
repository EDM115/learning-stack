import Head from "next/head"
import { nunitoSans } from "@/utils/fonts"
import Navbar from "@/components/navbar"
import { Pencil, Plus, X } from "lucide-react"
import axios from "axios"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export type Goal = {
  id: number
  goal: string
  duration: string
  calories: number
  weight: number
}

export async function getServerSideProps() {
  const goals = await axios
    .get("http://localhost:3030/goals")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching goals:", error)
      return []
    })

  return {
    props: {
      goals: goals as Goal[]
    }
  }
}

function Goals({ goals }: { goals: Goal[] }) {
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
