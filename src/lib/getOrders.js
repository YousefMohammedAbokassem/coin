import { getServerSession } from "next-auth"

export async function getOrders(){

    const session = await getServerSession()




    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/orders/my_orders`, {
        headers: {
            Authorization: `Bearer ${session.data.token}`
        }
    })
}