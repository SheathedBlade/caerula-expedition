import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addEntry(name: string, score: number) {
  await prisma.leaderboard.create({
    data: {
      player_name: name,
      score: score,
    },
  });

  const allEntries = await prisma.leaderboard.findMany();
  console.log(allEntries);
}

// Gets top 5 scores (order by desc, take 5)
export async function showTop5() {
  return await prisma.leaderboard.aggregate({
    orderBy: {
      score: "desc",
    },
    take: 5,
  });
}
