// import { getServerSession } from "next-auth"

// import { authOptions } from "../auth/[...nextauth]/route"

// export async function GET(){

//     const session = await getServerSession(authOptions)

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/products`, {
//         headers: {
//             Authorization: `Bearer ${session?.data?.user?.token}`
//         }
//     })

//     const data = await res.json()

//     return Response.json(data)

// }

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const token = session?.user?.token;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiURL}user/products`;

  const response = await fetch(url, { headers });
  const data = await response.json();

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  return Response.json(data);
}
