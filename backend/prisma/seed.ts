import prisma from "./instance.js"

async function main() {
  const goal1 = await prisma.goal.create({
    data: {
      title: "Perdre du poids",
      duration: 90,
      calories: 2000,
      weight: 70
    },
    select: {
      id: true
    }
  })
  const goal2 = await prisma.goal.create({
    data: {
      title: "Prise de masse",
      duration: 180,
      calories: 2500,
      weight: 80
    },
    select: {
      id: true
    }
  })
  const goal3 = await prisma.goal.create({
    data: {
      title: "Séance cardio",
      duration: 30,
      calories: 1500,
      weight: 75
    },
    select: {
      id: true
    }
  })
  const goal4 = await prisma.goal.create({
    data: {
      title: "Musculation",
      duration: 60,
      calories: 1800,
      weight: 75
    },
    select: {
      id: true
    }
  })

  const meal1 = await prisma.meal.create({
    data: {
      name: "Petit-déjeuner",
      day: new Date("2025-02-10"),
      calories: 300,
      protein: 20,
      carbs: 50,
      fat: 10
    },
    select: {
      id: true
    }
  })
  const meal2 = await prisma.meal.create({
    data: {
      name: "Déjeuner",
      day: new Date("2025-02-10"),
      calories: 600,
      protein: 30,
      carbs: 70,
      fat: 20
    },
    select: {
      id: true
    }
  })
  const meal3 = await prisma.meal.create({
    data: {
      name: "Dîner",
      day: new Date("2025-02-10"),
      calories: 500,
      protein: 25,
      carbs: 60,
      fat: 15
    },
    select: {
      id: true
    }
  })

  const session1 = await prisma.session.create({
    data: {
      date: new Date("2025-02-10T18:30"),
      duration: 60,
      calories: 300,
      weight: 70,
      goals: {
        connect: {
          id: goal2.id
        }
      }
    },
    select: {
      id: true
    }
  })
  const session2 = await prisma.session.create({
    data: {
      date: new Date("2025-02-12T18:30"),
      duration: 60,
      calories: 500,
      weight: 75,
      goals: {
        connect: {
          id: goal3.id
        }
      }
    },
    select: {
      id: true
    }
  })
  const session3 = await prisma.session.create({
    data: {
      date: new Date("2025-02-14T18:30"),
      duration: 60,
      calories: 400,
      weight: 75,
      goals: {
        connect: {
          id: goal4.id
        }
      }
    },
    select: {
      id: true
    }
  })

  await prisma.user.create({
    data: {
      name: "Test",
      email: "test@test.com",
      password: "azertyuiop",
      goals: {
        connect: [
          { id: goal1.id },
          { id: goal2.id },
          { id: goal3.id },
          { id: goal4.id }
        ]
      },
      meals: {
        connect: [{ id: meal1.id }, { id: meal2.id }, { id: meal3.id }]
      },
      sessions: {
        connect: [{ id: session1.id }, { id: session2.id }, { id: session3.id }]
      }
    }
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
