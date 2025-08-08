
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "home_room_teachers"})
export  class EntityHomeRoomTeacher {

    @PrimaryGeneratedColumn()
    id !: number;

    @Column({ type: "varchar", length: 255, unique: true })
    email !: string;

    @Column({ type: "varchar", length: 255, unique: true })
    fullname !: string;

    @Column({ type: "varchar", length: 255, unique: true })
    nip !: string;

    @Column({ type: "varchar", length: 255 })
    subjects !: string;

    @Column({ type: "int" })
    experience !: number;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt !: Date | string;

    @CreateDateColumn({ name: "created_at" })
    createdAt !: Date | string;
}