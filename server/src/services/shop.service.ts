import prisma from '~/models/client'

export const findByEmail = async (email: string) => {
  const select = {
    shop_id: true,
    shop_name: true,
    shop_email: true,
    shop_password: true,
    shop_status: true
    // shop_roles: true
  }
  
  return await prisma.shop.findUnique({
    where: { shop_email: email },
    select: select
  })
}
