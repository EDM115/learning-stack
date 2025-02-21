import { IsString, IsDefined, IsOptional } from "class-validator";
import { Goal, Meal, Session } from "./";

export class User {
    @IsDefined()
    @IsString()
    id!: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsDefined()
    @IsString()
    email!: string;

    @IsDefined()
    @IsString()
    password!: string;

    @IsDefined()
    goals!: Goal[];

    @IsDefined()
    meals!: Meal[];

    @IsDefined()
    sessions!: Session[];
}
