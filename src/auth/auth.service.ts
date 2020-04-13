import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload.interface'

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp (authCrendetialsDto: AuthCredentialsDto ) : Promise<void>{
        return await this.userRepository.singUp(authCrendetialsDto);
    }

    async signIn (authCrendetialsDto: AuthCredentialsDto ) : Promise<{ accessToken:string }>{
        var username = await this.userRepository.validateUserPassword(authCrendetialsDto);
        
        if (!username){
            throw new UnauthorizedException("Invalid Credentials");
        }

        const payload : JwtPayload = { username }

        const accessToken = await this.jwtService.sign(payload);

        return  { accessToken };
    }

    

}
