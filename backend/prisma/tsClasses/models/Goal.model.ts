import { IsString, IsDefined, IsBoolean, IsInt, IsOptional } from "class-validator";
import { User, Session } from "./";

export class Goal {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    title!: string;

    @IsDefined()
    @IsBoolean()
    completed!: boolean;

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
    session!: Session[];
}
