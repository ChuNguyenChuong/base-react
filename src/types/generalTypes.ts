import { ReactNode } from 'react';

export type WithChildrenProps<T = undefined> = T extends undefined
  ? {
      children?: ReactNode;
    }
  : T & {
      children?: ReactNode;
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyElement = any;

export interface ParamsGetAll {
  current: number;
  pageSize: number;
  status: string[] | null;
  createdAt: string[] | null;
  name: string[] | null;
  title: string[] | null;
}
export interface ParamsGetOrder {
  current: number;
  pageSize: number;
  status: string[] | null;
  createdAt: string[] | null;
  name: string[] | null;
}
export interface ParamsGetDelegate {
  current: number;
  pageSize: number;
  createdAt: string[] | null;
  name: string[] | null;
  country: string[] | null;
}
export interface IOrder {
  banks_id: string;
  payment_amount: string;
  status_payment: number;
  description: string;
  id: string;
  created_at: string;
}
export interface IDataSearchPresentations {
  status: string[] | null;
  createdAt: string[] | null;
  name: string[] | null;
  title: string[] | null;
}
export interface IDataSearchOrder {
  status: string[] | null;
  createdAt: string[] | null;
  name: string[] | null;
}
export interface IDataSearchDelegate {
  createdAt: string[] | null;
  name: string[] | null;
  country: string[] | null;
}
export interface IReportPresentation {
  id: string;
  approve: number;
  created_at: string;
  description: string;
  files: string[];
  files_path: string;
  full_name: string;
  rate: number;
  status: number;
  title: string;
}

export interface IDelegate {
  id: string;
  job: string;
  company: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  avatar_path: string;
  registration_form_id: string;
  created_at: string;
  abstracts: IAbstracts;
  orders: IOrders;
  register_conference: IRegisterConference;
  emergency_contact: IEmergencyContact;
  private_information: IPrivateInformation;
}

export interface IAbstracts {
  id: string;
  title: string;
  description: string;
  //files: File;
  status: number;
  approve: number;
  rate: number;
  created_at: string;
  files_path: string;
}

export interface IOrders {
  id: string;
  banks_id: string;
  payment_amount: string;
  status_payment: number;
  description: string;
  created_at: string;
}

export interface IRegisterConference {
  id: string;
  registration_form_id: string;
  name: string;
  fullname: string;
  phone: string;
  email: string;
  country: string;
  identification: string;
  job_title: string;
  company: string;
  transport: string;
  information_from: string;
  information_to: string;
  is_register_car: number;
  is_government: number;
}

export interface IEmergencyContact {
  id: string;
  name: string;
  fullname: string;
  phone: string;
  email: string;
  information_to: string;
}

export interface IPrivateInformation {
  id: string;
  shirt_size_id: string;
  medical_description: string;
  diet_id: string;
  food_id: string;
  food_description: string;
}

export interface IUser {
  id: string;
  username: string;
  role: 'admin' | 'user';
}
export interface ILogin {
  username: string;
  password: string;
}
export interface ActionType<T> {
  type: string;
  payload?: T;
}
