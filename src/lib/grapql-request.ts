"use server";

import { ClientError, GraphQLClient, Variables } from "graphql-request";
import { verifySession } from "./auth";
import { redirect } from "next/navigation";

let grapQLClient: GraphQLClient;

const getClient = async () => {
  const session = await verifySession();
  if (!session) {
    return redirect("/login");
  }
  if (grapQLClient) {
    return grapQLClient;
  }

  grapQLClient = new GraphQLClient(process.env["GRAPQL_ENDPOINT"] ?? "", {
    headers: {
      authorization: `Bearer ${session.accessToken}`,
    },
  });
  return grapQLClient;
};

export async function graphqlRequest<TRes>(
  query: string,
  variable?: Variables
) {
  try {
    const client = await getClient();
    const response = await client.request<TRes>(query, {
      ...variable,
    });

    return response;
  } catch (e) {
    if (e instanceof ClientError) {
      console.log(e.response);
    } else {
      console.log({ e });
    }
  }
}
