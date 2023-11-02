export type SingleVisitData = {
  id: number;
  // here we can also use reservation id, to display a page containing reservation details
  name: string; // TODO: change to limited type when the proper backend logic will be done
  duration: number;
  date: Date;
};

export enum UserRole {
  CLIENT = 'client',
  EMPLOYEE = 'employee',
  ADMIN = 'admin'
}
