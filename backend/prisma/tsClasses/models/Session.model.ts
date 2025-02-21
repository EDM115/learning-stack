import { IsString, IsDefined, IsDate, IsInt, IsOptional } from "class-validator";
import { User, Goal } from "./";

export class Session {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsDate()
    date!: Date;

    @IsDefined()
    @IsInt()
    duration!: number;

    @IsDefined()
    @IsInt()
    calories!: number;

    @IsDefined()
    @IsInt()
    weight!: number;

    @IsOptional()
    user?: User;

    @IsOptional()
    @IsString()
    userId?: string;

    @IsDefined()
    goals!: Goal[];
}
