import { PropuestaEntity } from "../../propuesta/propuesta.entity/propuesta.entity";
import { EstudianteEntity } from "../../estudiante/estudiante.entity/estudiante.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProyectoEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @Column()
    url: string;

    @OneToOne(() => EstudianteEntity, estudiante => estudiante.proyecto)
    @JoinColumn()
    estudiante: EstudianteEntity;

    @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto)
    @JoinColumn()
    propuesta: PropuestaEntity;

}
