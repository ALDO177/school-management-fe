import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "students" })
export class EntityStudent {

    @PrimaryGeneratedColumn()
    id !: number;

    @Column({ type: "varchar", unique: true, length: 200 })
    nama !: string;

    @Column({ type: "varchar", unique: true, length: 200 })
    nisn !: string;

    @Column({ type: "varchar", unique: true, length: 200 })
    no_class !: string;

    @Column({ type: "varchar", default: true })
    status !: boolean;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt !: Date | string;

    @CreateDateColumn({ name: "created_at" })
    createdAt !: Date | string;
}