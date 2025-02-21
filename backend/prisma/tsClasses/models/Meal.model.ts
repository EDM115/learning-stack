import { IsString, IsDefined, IsDate, IsInt, IsOptional } from "class-validator";
import { User } from "./";

export class Meal {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsDate()
    day!: Date;

    @IsDefined()
    @IsInt()
    calories!: number;

    @IsDefined()
    @IsInt()
    protein!: number;

    @IsDefined()
    @IsInt()
    carbs!: number;

    @IsDefined()
    @IsInt()
    fat!: number;

    @IsOptional()
    user?: User;

    @IsOptional()
    @IsString()
    userId?: string;
}
