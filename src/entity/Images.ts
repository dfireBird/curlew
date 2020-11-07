import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    link: string;
}
