import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o'
export type Score = number

export type Row = [ Symbol | null ]
export type Board =  Row 


type Status = 'pending' | 'started' | 'finished'

//const emptyScore: Score = 0
const emptyRow: Row = [null]
const emptyBoard: Board =  emptyRow 

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', {length:1, default: 'x'})
  turn: Symbol


  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol','score'], {unique:false})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column()
  score: number

  @Column('char', {length: 1})
  symbol: Symbol
}

// @Entity()
// export class Result extends BaseEntity {

//   @PrimaryGeneratedColumn()
//   id?: number

//   @ManyToOne(_ => User, user => user.players)
//   user: User

//   @ManyToOne(_ => Game, game => game.players)
//   game: Game

//   @Column()
//   userId: number

//   @Column()
//   score: number

//   @Column('char', {length: 1})
//   symbol: Symbol
// }