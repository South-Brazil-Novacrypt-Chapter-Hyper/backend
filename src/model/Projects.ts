import {
  Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn,
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
    scope: string;

    @ManyToMany(() => Account, (account: Account) => account.projects, {
      cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'account_id' })
    accounts: Account[];
}
