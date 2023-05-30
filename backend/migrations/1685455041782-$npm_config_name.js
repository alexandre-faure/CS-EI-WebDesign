import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685455041782 {
    name = ' $npmConfigName1685455041782'

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
                CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("user_email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"(
                    "user_id",
                    "user_email",
                    "user_firstname",
                    "user_lastname"
                )
            SELECT "user_id",
                "user_email",
                "user_firstname",
                "user_lastname"
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
                CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("user_email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"(
                    "user_id",
                    "user_email",
                    "user_firstname",
                    "user_lastname"
                )
            SELECT "user_id",
                "user_email",
                "user_firstname",
                "user_lastname"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
    }
}
