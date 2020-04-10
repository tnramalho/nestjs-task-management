import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(

        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){

    }
    //private tasks: Task[] = [];

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    // getTasksWithFilter(dto : GetTaskFilterDto): Task[] {
    //     const { status, search } = dto;
        
    //     let newTasks = this.getAllTasks();

    //     if (status){
    //         newTasks =  newTasks.filter(task => 
    //              task.status === status
    //         );
    //     }

    //     if(search) {
    //         newTasks = newTasks.filter(task => 
    //              task.title.includes(search) || 
    //                     task.description.includes(search) 
    //         );
    //     }

    //     return newTasks;
    // }
    
    async getTaskById (id:number) : Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found){
            throw new NotFoundException(`${id} was not found`);
        }

        return found;
    }

    async createTask(createTaskDto : CreateTaskDto) : Promise<Task> {
        
        return await this.taskRepository.createTask(createTaskDto);
        
    }

    async deleteTask (id:number) : Promise<void> {
        const found = await this.taskRepository.delete(id);
        if (found.affected === 0 ){
            throw new NotFoundException("Task not found");
        }
    }

    async updateTaskStatus (id:number, status: TaskStatus) : Promise<Task>  {
        
        const task = await this.getTaskById(id);
        task.status = status;

        await task.save();

        return task;
    }
    
}
