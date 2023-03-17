import { CreateStatus } from "./enums/CreateStatus";

export class SharedModel 
{
    public Status: CreateStatus = 0;
    public RecordPk:number = 0;
    public errors: string[] = [];

    constructor()
    {
    }
}