import { Baby, Shapes, User } from "lucide-react";
export enum MenuLinkEnum {
  CLASSROOM = "/",
  STUDENT = "/student",
  TEACHER = "/teacher",
}

export const menus = [
  {
    name: "Classroom",
    url: MenuLinkEnum.CLASSROOM,
    icon: Shapes,
  },
  {
    name: "Student",
    url: MenuLinkEnum.STUDENT,
    icon: Baby,
  },
  {
    name: "Teacher",
    url: MenuLinkEnum.TEACHER,
    icon: User,
  },
];
