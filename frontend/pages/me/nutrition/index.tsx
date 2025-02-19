import Head from "next/head"
import { getNutrition } from "@/utils/api"
import { nunitoSans } from "@/utils/fonts"
import { Nutrition } from "@/utils/types"
import Navbar from "@/components/navbar"
import { Plus, Pencil, X } from "lucide-react"

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
  const nutrition = await getNutrition()

  return {
    props: {
      nutrition
    }
  }
}

export default function NutritionPage({ nutrition }: { nutrition: Nutrition[] }) {
  return (
    <>
      <Head>
        <title>Ma nutrition - TrackFit</title>
        <meta
          name="description"
          content="Gérez votre alimentation pour atteindre vos objectifs."
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <h1>
          Ma nutrition
          <Button className="ml-4">
            <Plus />
            Ajouter un repas
          </Button>
        </h1>
        <div className="w-full max-w-4xl p-4 shadow-md rounded-lg">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Jour</TableHead>
                <TableHead>Repas</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Protéines (g)</TableHead>
                <TableHead>Glucides (g)</TableHead>
                <TableHead>Lipides (g)</TableHead>
                <TableHead>Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nutrition.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.day}</TableCell>
                  <TableCell>{entry.meal}</TableCell>
                  <TableCell>{entry.calories}</TableCell>
                  <TableCell>{entry.proteins}</TableCell>
                  <TableCell>{entry.carbs}</TableCell>
                  <TableCell>{entry.fats}</TableCell>
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
