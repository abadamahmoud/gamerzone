// models/request.ts
export class RequestBody {
    @Length(1, 30)
    @IsString()
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  }