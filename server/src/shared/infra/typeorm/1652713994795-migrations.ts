import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1652713994795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE teste');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE teste');
  }
}
