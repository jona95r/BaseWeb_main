import { ReconciliationDetailModel } from "./reconciliationDetail-model";

export class ReconciliationModel{
    id: number;
    guid: string;
    docDate: Date;
    createdBy: number;
    createdByName: string;
    detail: ReconciliationDetailModel[]
}