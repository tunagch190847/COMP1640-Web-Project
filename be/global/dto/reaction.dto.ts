import { IsInt } from "class-validator";

// Validate 0 or 1
export class VCreateReactionDto {
    @IsInt()
    reaction: number;
}