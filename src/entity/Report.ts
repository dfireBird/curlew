import {
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    Entity,
    CreateDateColumn,
} from "typeorm";
import { Team } from "./Team";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("date")
    date: Date;

    @Column()
    venue: string;

    @Column("text")
    report: string;

    @CreateDateColumn({ type: "date" })
    report_date: Date;

    @ManyToOne(() => Team)
    submittedBy: Team;
}
