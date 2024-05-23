import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class EstudianteDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly cod: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly cred: number;


}
