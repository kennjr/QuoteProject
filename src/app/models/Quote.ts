export class Quote{
    id?:number;
    creator?:string;
    author!:string;
    quote!:string;
    upvt_count!:number;
    dwnvt_count!:number;
    timestamp!:string;
    isUpVt?:boolean=false;
    isDwnVt?:boolean=false;
    expandView?:boolean=false;
}