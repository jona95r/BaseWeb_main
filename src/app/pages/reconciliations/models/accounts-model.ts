import { AccountsDetailModel } from "./accountsDetail-model";

export class AccountsModel{
    id: number;
    guid: string;
    docDate: Date;
    createdBy: number;
    createdByName: string;
    detail: AccountsDetailModel[]
}