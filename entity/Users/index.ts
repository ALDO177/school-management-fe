import { hash } from "bcrypt";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN   = "admin",
    STUDENT = "student",
    TEACHER = "teacher"
}

@Entity({ name: "users" })
export default class User {

    @PrimaryGeneratedColumn()
    id !: number;

    @Column({ type: "varchar", length: 255 })
    name !: string

    @Column({ type: "varchar", length: 200, unique: true })
    username !: string;

    @Column({ type: "varchar", length: 255, select: false })
    password !: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hasPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }

    @Column({ type: "boolean", default: true })
    status!: boolean

    @Column({ type: 'enum', enum: UserRole, default: UserRole.ADMIN })
    role !: UserRole;

    @Column({ type: "varchar", length: 255, default: null })
    remember_token !: string;

    @Column({ type: 'date', default: null })
    last_login !: Date | number | string;

    @Column({ type: "int", default: null })
    student_id !: number;

    @Column({ type: "int", default: null })
    home_room_teacher_id !: number;

    @Column({ type: "int", default: null })
    home_room_assigment !: number;

    @Column({ type: "int", default: null })
    guidence_conselors_id !: number;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt !: Date | string;

    @CreateDateColumn({ name: "created_at" })
    createdAt !: Date | string;

}