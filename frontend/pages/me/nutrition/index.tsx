import Head from "next/head"
import { nunitoSans } from "@/utils/fonts"
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

export function getNutrition() {
  return [
    {
      id: 1,
      day: "Lundi 10/02/2025",
      meal: "Petit-déjeuner",
      calories: 300,
      proteins: 20,
      carbs: 50,
      fats: 10
    },
    {
      id: 2,
      day: "Lundi 10/02/2025",
      meal: "Déjeuner",
      calories: 600,
      proteins: 30,
      carbs: 70,
      fats: 20
    },
    {
      id: 3,
      day: "Lundi 10/02/2025",
      meal: "Dîner",
      calories: 500,
      proteins: 25,
      carbs: 60,
      fats: 15
    }
  ]
}

function Nutrition() {
  const nutrition = getNutrition()

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
          <Button className="ml-4 bg-white text-background hover:bg-muted/80">
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
                    <Button size="icon" className="ml-2" variant="destructive">
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

export default Nutrition
