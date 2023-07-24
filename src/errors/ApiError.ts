export class ApiError extends Error
{
    public status:number;

    constructor(status:number,message:string)
    {
        super();
        this.status = status;
        this.message = message;
    }
    static NotFound()
    {
        return new ApiError(404,"Not found");
    }
    static BadRequest(message:string)
    {
        return new ApiError(400,message);
    }
}