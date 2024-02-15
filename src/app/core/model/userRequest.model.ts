export interface ICreateAdmin {
    username: string;
    email: string;
    disabled: boolean;
    password: string;
}

export interface ICreateDept {
    name_of_department: string;
}

export interface ICreateRole {
    department_id: string;
    name_of_role: string;
    describe_role: string;
    minimum_hour: number;
    maximum_hour: number;
  }