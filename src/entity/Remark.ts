import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Remark {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cluster: string;

    @Column()
    name: string;

    @Column()
    year: number;

    @Column("text")
    remarks: string;
}
