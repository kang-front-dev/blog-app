export interface IUser {
  _id?: string,
  name?: string,
  email: string,
  password: string,
  regDate?: string,
  logDate?: string,

}
export class User implements IUser{
  _id?: string;
  public name?: string;
  public email: string;
  password: string;
  regDate?: string;
  logDate?: string;
  constructor(options:IUser){
    if(options._id){
      this._id = options._id
    }
    this.name = options.name
    this.email = options.email
    this.password = options.password
    this.regDate = options.regDate
    this.logDate = options.logDate
  }
}