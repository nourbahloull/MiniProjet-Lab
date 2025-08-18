import { EVT } from "./Evt";

export interface Member{
    id : string,
    cin : string,
    name : string,
    type : string,
    createdDate : string,
    tabEvent:EVT[]

}