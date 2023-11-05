import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  } from 'typeorm';
  
  import { Exclude } from 'class-transformer';

  @Entity('users')
  class User {
      @PrimaryGeneratedColumn('uuid')
      id: string;
  
      @Column()
      name: string;

      @Column()
      username: string;
  
      @Column()
      email: string;
  
      @Column()
      @Exclude()
      password: string;

      @Column()
      is_teacher: boolean;
  
      @CreateDateColumn()
      created_at: Date;
  
      @UpdateDateColumn()
      updated_at: Date;
  }
  
  export default User;