import { getSession } from "next-auth/react";

import { fetchProduct } from "@/lib/getCollection";


export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
     }

     const { page, id, low_price, high_price, search, sort } = req.query;

     const token = session.data.user.token; // Assuming you have an access token in the session


     try {
        const data = await fetchProduct(page, id, low_price, high_price, search, sort, token);
        res.status(200).json(data);
     } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
     }
}
