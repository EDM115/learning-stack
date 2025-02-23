import Head from "next/head"
import { getNutrition } from "@/utils/api"
import { nunitoSans } from "@/utils/fonts"
import { Meal } from "@/utils/types"
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
import { withAuth } from "@/utils/withAuth"

export async function getServerSideProps() {
  const nutrition = await getNutrition()

  return {
    props: {
      nutrition
    }
  }
}

function NutritionPage({ nutrition }: { nutrition: Meal[] }) {
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
                <TableHead>Protéines</TableHead>
                <TableHead>Glucides</TableHead>
                <TableHead>Lipides</TableHead>
                <TableHead>Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nutrition.map((entry) => (
                <TableRow key={entry.id}>
                    <TableCell>
                    {(() => {
                      const date = new Date(entry.day)
                      const dayName = date.toLocaleDateString("fr-FR", { weekday: "long" }).charAt(0).toUpperCase() + date.toLocaleDateString("fr-FR", { weekday: "long" }).slice(1)
                      return `${dayName} ${date.toLocaleDateString("fr-FR")}`
                    })()}
                    </TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.calories} kCal</TableCell>
                  <TableCell>{entry.protein} g</TableCell>
                  <TableCell>{entry.carbs} g</TableCell>
                  <TableCell>{entry.fat} g</TableCell>
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

export default withAuth(NutritionPage)
