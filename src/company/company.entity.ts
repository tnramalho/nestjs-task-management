import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Exclude } from "class-transformer";

@Entity()
export class Company {
  @PrimaryGeneratedColumn() companyId: number;
 
  @IsNotEmpty()
  @Column() name: string;

  
  @Exclude()
  @Column({
    nullable:true,
  }) 
  description: string;

   
}