import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685690763592 {
    name = ' $npmConfigName1685690763592'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "category" (
                "category_id" integer PRIMARY KEY NOT NULL,
                "category_title" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_user" (
                "movie_user_id_movie" integer NOT NULL,
                "movie_user_id_user" integer NOT NULL,
                "movie_user_status" integer NOT NULL,
                "movie_user_like" integer NOT NULL,
                PRIMARY KEY ("movie_user_id_movie", "movie_user_id_user")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "user_email" varchar NOT NULL,
                "user_firstname" varchar NOT NULL,
                "user_lastname" varchar NOT NULL,
                "user_pseudo" varchar NOT NULL,
                "user_date_of_birth" datetime NOT NULL,
                "user_password" varchar NOT NULL,
                "user_salt" varchar NOT NULL,
                "user_pref_tri" integer NOT NULL DEFAULT (0),
                "user_pref_categories" varchar NOT NULL DEFAULT (''),
                "user_pref_date_dbt" datetime DEFAULT (''),
                "user_pref_date_fin" datetime DEFAULT (''),
                CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("user_email")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "category"
        `);
    }
}
