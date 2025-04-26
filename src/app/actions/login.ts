// "use server";

// import { ILoginOutput, ILoginSchema } from "../types/schema/login";
// import { signIn } from "next-auth/react";

// export const loginAction = async (
//   data: ILoginSchema
// ): Promise<ILoginOutput> => {
//   const res = await signIn("credentials", {
//     redirect: false,
//     ...data,
//   });

//   if (!res) {
//     return {
//       error: "Invalid credential",
//     };
//   }

//   if (res.error || !res.ok) {
//     return {
//       error: res.error,
//     };
//   }

//   return {
//     data: "OK",
//   };
// };
