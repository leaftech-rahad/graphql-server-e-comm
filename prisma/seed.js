import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const c = await prisma.customer.create({
    data: {
      customer_Name: "dgdgddgdehbfhw",
      customer_phone: "gdg465357457",
      customer_registration_store_Id: "clhjb9tre0000pp9aefbmsufn",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
