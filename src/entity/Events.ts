import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm";

@Entity()
export class Events {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("date")
    date: Date;

    @Column()
    venue: string;

    @Column("simple-array")
    speakers: string[];

    @Column("varchar", { length: 1023 })
    link: string;

    @Column()
    tag: string;

    @Column("text")
    description: string;

    @CreateDateColumn()
    timestamp: Date;
}
