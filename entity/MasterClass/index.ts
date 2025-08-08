import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "master_class"})
export default class EntityMasterClass{

    @PrimaryGeneratedColumn()
    id !: number;

    @Column({ type: "varchar", length: 200, unique: true })
    class_name !: string;

    @Column({ type: "varchar", length: 200, default: null })
    img_url !: string;

    @Column({ type: "varchar", length: 200, default: null})
    level !: string
}