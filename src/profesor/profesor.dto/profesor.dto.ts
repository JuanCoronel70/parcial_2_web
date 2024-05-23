import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class ProfesorDto {
    
    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly grupoInv: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numExt: number;
    
}
