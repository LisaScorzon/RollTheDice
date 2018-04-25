import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
   Patch 
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board } from './entities' //Score
import { calculateWinner, finished} from './logic'
//import { Validate } from 'class-validator'
import {io} from '../index'
import { isValidTransition} from './logic'

 class GameUpdate {
 board : Board
  
 }

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create().save()

    await Player.create({
      game: entity, 
      user,
      symbol: 'x'
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const player = await Player.create({
      game, 
      user,
      symbol: 'o'
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: GameUpdate
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
    if (!isValidTransition(player.symbol, game.turn)) {
      throw new BadRequestError(`Invalid move`)
    }    
   

    const winner = calculateWinner(player.scorePlayer1,player.scorePlayer2)
    if (winner ) {
      game.winner = winner
      game.status = 'finished'
    
    }

    else if (finished(player.scorePlayer1,player.scorePlayer2)) {
      game.status = 'finished'
    }
    else {
      if (player.symbol ==='x') {
        player.scorePlayer1= player.scorePlayer1 +1
      return game.turn = player.symbol === 'x' ? 'o' : 'x'
    } 
else if(player.symbol ==='o') { 
  player.scorePlayer2 =player.scorePlayer2 +1
  return game.turn = player.symbol === 'o' ? 'x' : 'o'
}
    
    }
    game.board = update.board
    await game.save()

   
    
    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}

