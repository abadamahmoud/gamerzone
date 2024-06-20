// models/response.ts
export class ResponseBody {
    @Length(1, 100)
    @IsString()
    message: string;
  
    constructor(message: string) {
      this.message = message;
    }
  }