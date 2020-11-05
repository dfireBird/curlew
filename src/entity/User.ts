import { Column, PrimaryColumn, Entity } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;
}
