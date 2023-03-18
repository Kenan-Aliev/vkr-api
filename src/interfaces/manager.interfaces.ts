export interface Manager {
  name: string;
  surname: string;
  patronymic: string;
  date_birth: Date;
  phone: string;
  branchId: number;
  password: string;
}

export type EditManager = Omit<Manager, "phone" | "bracnhId" | "password">;
