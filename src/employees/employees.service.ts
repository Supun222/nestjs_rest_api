import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseServuce: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return await this.databaseServuce.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Role) {
    if (role) {
      return await this.databaseServuce.employee.findMany({
        where: {
          role,
          isActive: true,
        },
      });
    }
    return await this.databaseServuce.employee.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.databaseServuce.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return await this.databaseServuce.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return await this.databaseServuce.employee.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
