import {
  Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm';
// @ts-ignore
import Account from './Account.ts';

@Entity('projects')
export default class Project {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    platform: string;

    @Column()
    description: string;

    @Column()
    scope: boolean;

    @ManyToMany(() => Account)
    @JoinTable()
    accounts: Account[];
}
