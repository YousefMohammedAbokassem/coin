export default async function getDetails(id){


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/products/${id}`, {
        headers: {
            Authorization: `Bearer 11|la7iEX3yDOVBrVZtgOxziMsiqinLpcgm6GX17w5S54d5de14`
        }
    })



    if(!res.ok) throw new Error("faild to fetch Details")

    return res.json()
}