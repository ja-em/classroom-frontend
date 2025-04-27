"use server";

import { graphqlRequest } from "@/lib/grapql-request";
import { IPaginationRequest } from "@/types/interface/request";
import {
  IClassLevelObject,
  IPaginationResponse,
  IStudentObject,
} from "@/types/interface/response";
import { gql } from "graphql-request";

const queryAll = gql`
  query GetStudent($input: GetAllStudentInput) {
    getStudent(input: $input) {
      totalItem
      totalPage
      page
      limit
      hasNextPage
      hasPreviousPage
      items {
        identificationNumber
        id
        prefix
        firstName
        lastName
        gender
        birthDate
        createdAt
        updatedAt
        classLevelId
        classLevel {
          id
          name
        }
      }
    }
  }
`;

export const getAllStudentAction = async (
  variables: IPaginationRequest
): Promise<IPaginationResponse<IStudentObject[]>> => {
  const res = await graphqlRequest<{
    getStudent: IPaginationResponse<IStudentObject[]>;
  }>(queryAll, {
    input: { ...variables, limit: 10 },
  });
  if (!res) {
    const mock: IPaginationResponse<IStudentObject[]> = {
      items: [] as IStudentObject[],
      totalItem: 0,
      totalPage: 0,
      page: 0,
      limit: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    return mock;
  }
  return res.getStudent;
};

const queryAllClassLevel = gql`
  query GetStudent {
    getClassLevel {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const getAllClassLevelAction = async (): Promise<
  IClassLevelObject[]
> => {
  const res = await graphqlRequest<{
    getClassLevel: IClassLevelObject[];
  }>(queryAllClassLevel);

  return res?.getClassLevel ?? [];
};
