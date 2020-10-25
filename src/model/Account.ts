import { Entity } from 'typeorm/decorator/entity/Entity';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { JoinColumn, ManyToMany } from 'typeorm';
// @ts-ignore
import Project from './Projects.ts';

@Entity('accounts')
export default class Account {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    github: string;

    @ManyToMany(() => Project, (project: Project) => project.account, {
      cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'account_id' })
    projects: Project[];
}
