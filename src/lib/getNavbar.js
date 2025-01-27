import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fallbackLng } from "@/i18n/settings";

import { getServerSession } from "next-auth";

export async function getNavbar(lng) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/categories`, {
    headers: {
      // Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      Authorization: `Bearer ${session?.user?.token}`,
      lang: lng,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// export async function getProduct() {

//   const session = await getServerSession(authOptions);

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/products`, {
//     headers: {
//       Authorization: `Bearer ${session?.user?.token}`
//     }
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data from product");
//   }

//   return res.json();
// }

export async function getProduct() {

  const session = await getServerSession(authOptions);


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/products`, {
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data from product");
  }

  return res.json()
}
