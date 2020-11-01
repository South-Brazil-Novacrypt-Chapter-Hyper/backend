/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProjectaccount1604161798925 implements MigrationInterface {
    name = 'createProjectaccount1604161798925'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "temporary_projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" text NOT NULL, "scope" text NOT NULL, "account_id" integer NOT NULL)');
      await queryRunner.query('INSERT INTO "temporary_projects"("id", "name", "platform", "description", "scope", "account_id") SELECT "id", "name", "platform", "description", "scope", "account_id" FROM "projects"');
      await queryRunner.query('DROP TABLE "projects"');
      await queryRunner.query('ALTER TABLE "temporary_projects" RENAME TO "projects"');
      await queryRunner.query('CREATE TABLE "projects_accounts_accounts" ("projectsId" integer NOT NULL, "accountsId" integer NOT NULL, PRIMARY KEY ("projectsId", "accountsId"))');
      await queryRunner.query('CREATE INDEX "IDX_3a2f20c6aff6d7957ebb9d1721" ON "projects_accounts_accounts" ("projectsId") ');
      await queryRunner.query('CREATE INDEX "IDX_16b92696ba8c16f33a6725db5d" ON "projects_accounts_accounts" ("accountsId") ');
      await queryRunner.query('CREATE TABLE "temporary_projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" text NOT NULL, "scope" text NOT NULL)');
      await queryRunner.query('INSERT INTO "temporary_projects"("id", "name", "platform", "description", "scope") SELECT "id", "name", "platform", "description", "scope" FROM "projects"');
      await queryRunner.query('DROP TABLE "projects"');
      await queryRunner.query('ALTER TABLE "temporary_projects" RENAME TO "projects"');
      await queryRunner.query('CREATE TABLE "temporary_projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" varchar NOT NULL, "scope" varchar NOT NULL)');
      await queryRunner.query('INSERT INTO "temporary_projects"("id", "name", "platform", "description", "scope") SELECT "id", "name", "platform", "description", "scope" FROM "projects"');
      await queryRunner.query('DROP TABLE "projects"');
      await queryRunner.query('ALTER TABLE "temporary_projects" RENAME TO "projects"');
      await queryRunner.query('DROP INDEX "IDX_3a2f20c6aff6d7957ebb9d1721"');
      await queryRunner.query('DROP INDEX "IDX_16b92696ba8c16f33a6725db5d"');
      await queryRunner.query('CREATE TABLE "temporary_projects_accounts_accounts" ("projectsId" integer NOT NULL, "accountsId" integer NOT NULL, CONSTRAINT "FK_3a2f20c6aff6d7957ebb9d17215" FOREIGN KEY ("projectsId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_16b92696ba8c16f33a6725db5df" FOREIGN KEY ("accountsId") REFERENCES "accounts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("projectsId", "accountsId"))');
      await queryRunner.query('INSERT INTO "temporary_projects_accounts_accounts"("projectsId", "accountsId") SELECT "projectsId", "accountsId" FROM "projects_accounts_accounts"');
      await queryRunner.query('DROP TABLE "projects_accounts_accounts"');
      await queryRunner.query('ALTER TABLE "temporary_projects_accounts_accounts" RENAME TO "projects_accounts_accounts"');
      await queryRunner.query('CREATE INDEX "IDX_3a2f20c6aff6d7957ebb9d1721" ON "projects_accounts_accounts" ("projectsId") ');
      await queryRunner.query('CREATE INDEX "IDX_16b92696ba8c16f33a6725db5d" ON "projects_accounts_accounts" ("accountsId") ');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX "IDX_16b92696ba8c16f33a6725db5d"');
      await queryRunner.query('DROP INDEX "IDX_3a2f20c6aff6d7957ebb9d1721"');
      await queryRunner.query('ALTER TABLE "projects_accounts_accounts" RENAME TO "temporary_projects_accounts_accounts"');
      await queryRunner.query('CREATE TABLE "projects_accounts_accounts" ("projectsId" integer NOT NULL, "accountsId" integer NOT NULL, PRIMARY KEY ("projectsId", "accountsId"))');
      await queryRunner.query('INSERT INTO "projects_accounts_accounts"("projectsId", "accountsId") SELECT "projectsId", "accountsId" FROM "temporary_projects_accounts_accounts"');
      await queryRunner.query('DROP TABLE "temporary_projects_accounts_accounts"');
      await queryRunner.query('CREATE INDEX "IDX_16b92696ba8c16f33a6725db5d" ON "projects_accounts_accounts" ("accountsId") ');
      await queryRunner.query('CREATE INDEX "IDX_3a2f20c6aff6d7957ebb9d1721" ON "projects_accounts_accounts" ("projectsId") ');
      await queryRunner.query('ALTER TABLE "projects" RENAME TO "temporary_projects"');
      await queryRunner.query('CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" text NOT NULL, "scope" text NOT NULL)');
      await queryRunner.query('INSERT INTO "projects"("id", "name", "platform", "description", "scope") SELECT "id", "name", "platform", "description", "scope" FROM "temporary_projects"');
      await queryRunner.query('DROP TABLE "temporary_projects"');
      await queryRunner.query('ALTER TABLE "projects" RENAME TO "temporary_projects"');
      await queryRunner.query('CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" text NOT NULL, "scope" text NOT NULL, "account_id" integer NOT NULL)');
      await queryRunner.query('INSERT INTO "projects"("id", "name", "platform", "description", "scope") SELECT "id", "name", "platform", "description", "scope" FROM "temporary_projects"');
      await queryRunner.query('DROP TABLE "temporary_projects"');
      await queryRunner.query('DROP INDEX "IDX_16b92696ba8c16f33a6725db5d"');
      await queryRunner.query('DROP INDEX "IDX_3a2f20c6aff6d7957ebb9d1721"');
      await queryRunner.query('DROP TABLE "projects_accounts_accounts"');
      await queryRunner.query('ALTER TABLE "projects" RENAME TO "temporary_projects"');
      await queryRunner.query('CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "platform" varchar NOT NULL, "description" text NOT NULL, "scope" text NOT NULL, "account_id" integer NOT NULL, CONSTRAINT "FK_286f70ef51cf6ecda509d85883d" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE)');
      await queryRunner.query('INSERT INTO "projects"("id", "name", "platform", "description", "scope", "account_id") SELECT "id", "name", "platform", "description", "scope", "account_id" FROM "temporary_projects"');
      await queryRunner.query('DROP TABLE "temporary_projects"');
    }
}
