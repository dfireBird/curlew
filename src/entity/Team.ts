import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Team {
    @OneToOne(() => User, { primary: true })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    avail_status: boolean;

    @Column("text")
    avail_description: string;
}
