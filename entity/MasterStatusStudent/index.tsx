import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "master_status_student"})
export default class EntityMastesStatus{

    @PrimaryGeneratedColumn()
    id !: number;

    @Column({ type: "varchar", length: 200, unique: true})
    status_name !: string;

    @Column({ type: "varchar",length: 200, default: null })
    description !: string;
}