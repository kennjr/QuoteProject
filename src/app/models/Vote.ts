export class Vote{
    id?:number;
    quoteId!:number;
    username!:string;
    userId!:number;
    isUpVote!:boolean;
    timestamp!:Date;
}