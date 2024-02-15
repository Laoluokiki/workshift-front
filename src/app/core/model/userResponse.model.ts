export interface UserResponse {
    last_name: string;
    id: number;
    email: string;
    home_address: string;
    marital_status: string;
    email_verification_code: string;
    is_verified: boolean;
    phone_number: string;
    gender: string;
    first_name: string;
    date_birth: string;
    password: string;
    date_created: string;
    
}


export interface IShift {
    start_time: number
    no_of_resources: number
    date_created: string
    end_time: number
    id: number
    role_id: number
  }
  