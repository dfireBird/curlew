import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Team {
    @OneToOne(() => User, { primary: true })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    cluster: string;

    @Column()
    year: number;

    @Column()
    avail_status: boolean;

    @Column("text")
    avail_description: string;

    @Column({ default: false })
    lead: boolean;

    @Column({ default: false })
    cluster_head: boolean;

    @Column({ default: false })
    google_account: false;

    @Column({ default: false })
    instagram: boolean;

    @Column({ default: false })
    twitter: boolean;

    @Column({ default: false })
    facebook: boolean;

    @Column({ default: false })
    github: boolean;

    @Column({ default: false })
    medium: boolean;

    @Column({ default: false })
    slack: boolean;

    @Column({ default: false })
    discord: boolean;
}
