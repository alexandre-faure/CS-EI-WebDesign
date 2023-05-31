import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685538641664 {
    name = ' $npmConfigName1685538641664'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "user_email" varchar NOT NULL,
                "user_firstname" varchar NOT NULL,
                "user_lastname" varchar NOT NULL,
                "user_date_of_birth" datetime NOT NULL,
                "user_password" varchar NOT NULL,
                "user_salt" varchar NOT NULL,
                "user_pref_tri" integer NOT NULL DEFAULT (0),
                "user_pref_categories" varchar NOT NULL DEFAULT (''),
                "user_pref_date_dbt" datetime NOT NULL DEFAULT ('00/00/0000'),
                "user_pref_date_fin" datetime NOT NULL DEFAULT ('00/00/0000'),
                CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("user_email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"(
                    "user_id",
                    "user_email",
                    "user_firstname",
                    "user_lastname",
                    "user_date_of_birth",
                    "user_password",
                    "user_salt"
                )
            SELECT "user_id",
                "user_email",
                "user_firstname",
                "user_lastname",
                "user_date_of_birth",
                "user_password",
                "user_salt"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "user_email" varchar NOT NULL,
                "user_firstname" varchar NOT NULL,
                "user_lastname" varchar NOT NULL,
                "user_date_of_birth" datetime NOT NULL,
                "user_password" varchar NOT NULL DEFAULT ('password'),
                "user_salt" varchar NOT NULL DEFAULT ('salt'),
                "user_pref_tri" integer NOT NULL DEFAULT (0),
                "user_pref_categories" varchar NOT NULL DEFAULT (''),
                "user_pref_date_dbt" datetime NOT NULL DEFAULT ('00/00/0000'),
                "user_pref_date_fin" datetime NOT NULL DEFAULT ('00/00/0000'),
                CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("user_email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"(
                    "user_id",
                    "user_email",
                    "user_firstname",
                    "user_lastname",
                    "user_date_of_birth",
                    "user_password",
                    "user_salt",
                    "user_pref_tri",
                    "user_pref_categories",
                    "user_pref_date_dbt",
                    "user_pref_date_fin"
                )
            SELECT "user_id",
                "user_email",
                "user_firstname",
                "user_lastname",
                "user_date_of_birth",
                "user_password",
                "user_salt",
                "user_pref_tri",
                "user_pref_categories",
                "user_pref_date_dbt",
                "user_pref_date_fin"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "user_email" varchar NOT NULL,
                "user_firstname" varchar NOT NULL,
                "user_lastname" varchar NOT NULL,
                "user_date_of_birth" datetime NOT NULL,
                "user_password" varchar NOT NULL,
                "user_salt" varchar NOT NULL,
                "user_pref_tri" integer NOT NULL DEFAULT (0),
                "user_pref_categories" varchar NOT NULL DEFAULT (''),
                "user_pref_date_dbt" datetime NOT NULL DEFAULT ('00/00/0000'),
                "user_pref_date_fin" datetime NOT NULL DEFAULT ('00/00/0000'),
                CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("user_email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"(
                    "user_id",
                    "user_email",
                    "user_firstname",
                    "user_lastname",
                    "user_date_of_birth",
                    "user_password",
                    "user_salt",
                    "user_pref_tri",
                    "user_pref_categories",
                    "user_pref_date_dbt",
                    "user_pref_date_fin"
                )
            SELECT "user_id",
                "user_email",
                "user_firstname",
                "user_lastname",
                "user_date_of_birth",
                "user_password",
                "user_salt",
                "user_pref_tri",
                "user_pref_categories",
                "user_pref_date_dbt",
                "user_pref_date_fin"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "user_email" varchar NOT NULL,
                "user_firstname" varchar NOT NULL,
                "user_lastname" varchar NOT NULL,
                "user_date_of_birth" datetime NOT NULL,
                "user_password" varchar NOT NULL,
                "user_salt" varchar NOT NULL,
                CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("user_email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"(
                    "user_id",
                    "user_email",
                    "user_firstname",
                    "user_lastname",
                    "user_date_of_birth",
                    "user_password",
                    "user_salt"
                )
            SELECT "user_id",
                "user_email",
                "user_firstname",
                "user_lastname",
                "user_date_of_birth",
                "user_password",
                "user_salt"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
    }
}
