// "use server";
// import { fallbackLng } from "@/i18n/settings";
// export const fetchProduct = async (
//   page,
//   id,
//   low_price,
//   high_price,
//   search,
//   sort
// ) => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}user/products?page=${page}${
//       id !== undefined ? `&category_id=${id}` : ""
//     }${low_price !== undefined ? `&low_price=${low_price}` : ""}${
//       high_price !== undefined ? `&high_price=${high_price}` : ""
//     }${search?.length ? `&search=${search}` : ""}${
//       sort?.length ? `&${sort}` : ""
//     }
//     `,
    
//     {
//       headers: {
//         Authorization:
//           "Bearer 5|pcpbtsQdGQWgcVamUPCTtUZrUAQEILypNwPyG7t0d0d9fe36",
//         lang: fallbackLng,
//       },
//     }
//   );

//   const data = await response.json();

//   return data;
  
// };


'use server'
import { fallbackLng } from "@/i18n/settings";
export const fetchProduct = async (
  page,
  id,
  low_price,
  high_price,
  search,
  sort,
  token
 ) => {
  const response = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}user/products?page=${page}${
       id !== undefined ? `&category_id=${id}` : ""
     }${low_price !== undefined ? `&low_price=${low_price}` : ""}${
       high_price !== undefined ? `&high_price=${high_price}` : ""
     }${search?.length ? `&search=${search}` : ""}${
       sort?.length ? `&${sort}` : ""
     }`,
     {
       headers: {
         Authorization: `Bearer ${token}`, 
         lang: fallbackLng,
       },
     }
  );
 
  const data = await response.json();
 
  return data;
 };