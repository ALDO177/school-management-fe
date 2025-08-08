
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum StatusStudent{
    AKTIF="Aktif",
    PERLU_PERHATIAN="Perlu Perhatian",
    TIDAK_AKTIF="Tidak Aktif"
}

@Entity({ name: "students" })
export class EntityStudent {

    @PrimaryGeneratedColumn()
    id !: number;

    @Index('IDX_NAME_FULLTEXT', { fulltext: true })
    @Column({ type: "varchar", unique: true, length: 200 })
    nama !: string;

    @Index('IDX_NISN_UNIQUE', { unique: true }) // 👈 index unik
    @Column({ type: "varchar", length: 200 })
    nisn !: string;

    @Column({ type: "varchar", length: 200 })
    no_class !: string;

    @Column({ type: "enum", enum: StatusStudent , default: StatusStudent.AKTIF })
    status !: StatusStudent;

    @Column({ type: "varchar", length: 200 , default: null })
    phone_number !: string | null;

    @Column({ type: "varchar", length: 255, default: null })
    address !: string | null;

    @Column({ type: "int", default: null })
    home_room_teacher_id !: number | null

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt !: Date | string;

    @CreateDateColumn({ name: "created_at" })
    createdAt !: Date | string;
}