export interface IPaginationResponse<TItem> {
  items: TItem;
  totalItem: number;
  totalPage: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IClassLevelObject {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudentObject {
  identificationNumber: string;
  id: number;
  prefix: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
  classLevelId: number;
  classLevel?: IClassLevelObject;
  // enrollment: EnrollmentObject;
}
