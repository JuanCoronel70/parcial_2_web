import { ProyectoEntity } from "../../proyecto/proyecto.entity/proyecto.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    nombre: string;

    @Column()
    cod: string;

    @Column()
    cred: number;

    @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
    @JoinColumn()
    proyecto: ProyectoEntity;


}
