import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685454715939 {
    name = ' $npmConfigName1685454715939'

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
