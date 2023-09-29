import { RoleType } from "../constants/workForm";

export type Loading = {
    page: boolean;
    purchase: boolean;
}

export type Industry = {
    id: number;
    name: string;
}

export type BadgeListProps = {
    profession?: RoleType;
    industries?: Industry[];
  };