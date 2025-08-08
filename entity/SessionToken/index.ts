import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name : "session_tokens"})
export class EntitySessionToken{

    @PrimaryGeneratedColumn()
    id !: number;

    @Column({ type: "varchar", length: 255})
    session_token !: string;

    @Column({ type: "int", default: null })
    user_id !: string;

    @Column({ type: "date", default: null })
    last_user_login !: Date | string;

    @Column({ type: "date", default: null  })
    expiresAt !: Date | string;

    @UpdateDateColumn({name: "updatedAt"})
    updated_at !: Date | String;

    @CreateDateColumn({ name: "createdAt"})
    created_at !: Date | string;

}