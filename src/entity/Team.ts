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

    @Column({ nullable: true })
    instagram: string;

    @Column({ nullable: true })
    twitter: string;

    @Column({ nullable: true })
    facebook: string;

    @Column({ nullable: true })
    github: string;

    @Column({ nullable: true })
    medium: string;

    @Column({ nullable: true })
    slack: string;

    @Column({ nullable: true })
    discord: string;
}
