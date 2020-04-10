import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){ }

    @Get()
    async getTaks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) : Promise<Task[]> {
        return await this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe)  id:number) : Promise<Task>{
        return await this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body()
        createTaskDto: CreateTaskDto
        ): Promise<Task> {

        return this.tasksService.createTask(createTaskDto);
    }

    @Delete("/:id")
    async deleteTask(@Param('id', ParseIntPipe) id:number) : Promise<void> {
        await this.tasksService.deleteTask(id);
    }

    @Patch("/:id/status")
    async updateTask (
            @Param('id', ParseIntPipe) id:number,
            @Body('status', TaskStatusValidationPipe) status:TaskStatus
        ) : Promise<Task> {
        
            return await this.tasksService.updateTaskStatus(id, status);
    }
}
