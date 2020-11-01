import {MigrationInterface, QueryRunner} from "typeorm";

export class changeProjectsScope1604234708309 implements MigrationInterface {
    name = 'changeProjectsScope1604234708309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" varchar NOT NULL, "scope" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_projects"("id", "name", "platform", "description", "scope") SELECT "id", "name", "platform", "description", "scope" FROM "projects"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`ALTER TABLE "temporary_projects" RENAME TO "projects"`);
        await queryRunner.query(`CREATE TABLE "temporary_projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" varchar NOT NULL, "scope" boolean NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_projects"("id", "name", "platform", "description", "scope") SELECT "id", "name", "platform", "description", "scope" FROM "projects"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`ALTER TABLE "temporary_projects" RENAME TO "projects"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" RENAME TO "temporary_projects"`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" varchar NOT NULL, "scope" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "projects"("id", "name", "platform", "description", "scope") SELECT "id", "name", "platform", "description", "scope" FROM "temporary_projects"`);
        await queryRunner.query(`DROP TABLE "temporary_projects"`);
        await queryRunner.query(`ALTER TABLE "projects" RENAME TO "temporary_projects"`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" varchar NOT NULL, "scope" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "projects"("id", "name", "platform", "description", "scope") SELECT "id", "name", "platform", "description", "scope" FROM "temporary_projects"`);
        await queryRunner.query(`DROP TABLE "temporary_projects"`);
    }

}
