

export class AppError extends Error{
    constructor(mesage,statusCode){
        super(mesage)
        this.statusCode = statusCode
    }
}