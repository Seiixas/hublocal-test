import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateResponsible1652717602370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'responsibles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'public_place',
            type: 'varchar',
          },
          {
            name: 'complement',
            type: 'varchar',
          },
          {
            name: 'district',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'company_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'is_main',
            type: 'boolean',
            default: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'responsibles',
      new TableForeignKey({
        name: 'FK_Responsible_Company',
        referencedTableName: 'companies',
        referencedColumnNames: ['id'],
        columnNames: ['company_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('FK_Responsible_Company', 'responsibles');

    await queryRunner.dropTable('responsibles');
  }
}
