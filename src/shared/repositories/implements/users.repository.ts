import { UsersRepository } from "../users.repository";	
import { Knex } from 'knex';
import { TUser, TUserUpdate } from "./users.types";
import { localDb } from "../../database/pg-connection"
export class UsersDBRepository implements UsersRepository {

  conn: Knex<any, unknown[]>;

  constructor() {
    this.conn = localDb;
  }

    async create(user: TUser): Promise<void> {
      await this.conn('users').insert(user);
    }

    async getAll(): Promise<any> {
        const data = await this.conn('users')
        .select('*')
        .from('users')
        .where('deleted', false); 

        return data; 
    }

    async getUserByDocument(company_document: string): Promise<TUser | undefined> {
        const data = await this.conn('users')
          .select<TUser>('*')
          .from('users')
          .where('company_document', company_document)
          .where('deleted', false)
          .first();
    
        return data;
       }

    async deleteUserByDocument(company_document: string): Promise<Boolean> {
        const data = await this.conn('users')
          .select<TUser>('*')
          .from('users')
          .where('company_document', company_document)
          .where('deleted', false)
          .first()
          .delete();
    
        return data ? true : false ;
       }

    async updateUserByDocument(company_document: string, data: TUserUpdate): Promise<Boolean> {
        const result = await this.conn('users')
          .select<TUser>('*')
          .from('users')
          .where('company_document', company_document)
          .where('deleted', false)
          .first()
          .update(data);

        return result ? true : false ;
       }

    async saveToken(company_document: string, token: string): Promise<void> {
        await this.conn('users')
          .select<TUser>('*')
          .from('users')
          .where('company_document', company_document)
          .where('deleted', false)
          .first()
          .update('token', token);
       }
    async verifyTokenUser(company_document: string): Promise<TUser | undefined> {
        const data = await this.conn('users')
          .select<TUser>('*')
          .from('users')
          .where('company_document', company_document)
          .where('deleted', false)
          .first()
    
        return data;
       }
}