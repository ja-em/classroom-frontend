"use server";

import { MenuLinkEnum } from "@/constants/menu";
import { graphqlRequest } from "@/lib/grapql-request";
import { IPaginationRequest } from "@/types/interface/request";
import {
  IClassLevelObject,
  IPaginationResponse,
  IStudentObject,
} from "@/types/interface/response";
import { ICreateStudenSchema } from "@/types/schema/student";
import { gql } from "graphql-request";
import { revalidatePath } from "next/cache";

const ALL_STUDENT_QUERY = gql`
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
  variables: IPaginationRequest & { classLevelId: number }
): Promise<IPaginationResponse<IStudentObject[]>> => {
  const res = await graphqlRequest<{
    getStudent: IPaginationResponse<IStudentObject[]>;
  }>(ALL_STUDENT_QUERY, {
    input: { ...variables, limit: 10 },
  });
  if (!res.ok || !res.data) {
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
  return res.data.getStudent;
};

const ALL_CLASS_LEVEL_QUERY = gql`
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
  }>(ALL_CLASS_LEVEL_QUERY);
  if (res.ok && res.data) {
    return res?.data.getClassLevel;
  } else {
    return [];
  }
};

const CREATE_STUDENT_MUTATION = gql`
  mutation CreateStudent($input: CreateStudentInput!) {
    createStudent(input: $input) {
      id
    }
  }
`;

export const createStudentAction = async (input: ICreateStudenSchema) => {
  const res = await graphqlRequest<{ createStudent: { id: number } }>(
    CREATE_STUDENT_MUTATION,
    { input }
  );
  if (res.ok) {
    revalidatePath(MenuLinkEnum.STUDENT);
  }
  return res;
};

const DELETE_STUDENT_MUTATION = gql`
  mutation DeleteStudent($studentId: Int!) {
    deleteStudent(studentId: $studentId)
  }
`;

export const deleteStudentAction = async (studentId: number) => {
  const res = await graphqlRequest<{ deleteStudent: { id: number } }>(
    DELETE_STUDENT_MUTATION,
    { studentId }
  );
  if (res.ok) {
    revalidatePath(MenuLinkEnum.STUDENT);
  }
  return res;
};

const UPDTAE_STUDENT_MUTATION = gql`
  mutation UpdateStudent($studentId: Int!, $input: UpdateStudentInput!) {
    updateStudent(studentId: $studentId, input: $input) {
      id
    }
  }
`;

export const updateStudentAction = async (
  studentId: number,
  input: ICreateStudenSchema
) => {
  const res = await graphqlRequest<{ deleteStudent: { id: number } }>(
    UPDTAE_STUDENT_MUTATION,
    { studentId, input }
  );
  if (res.ok) {
    revalidatePath(MenuLinkEnum.STUDENT, "page");
  }
  return res;
};
