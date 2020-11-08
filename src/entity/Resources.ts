import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Team } from "./Team";

@Entity()
export class Resources {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("varchar", { length: 1023 })
    url: string;

    @Column()
    category: string;

    @Column("text")
    description: string;

    @ManyToOne(() => Team)
    submittedBy: Team;
}
