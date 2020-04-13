import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './jwt.payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { User } from './user.entity';

// classe to use the logic about what going to happen with token
// when code get its from header
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,

    ){
        // logic to get it from header and uncrypt based on osecret key
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'topSecret51',
        });
    }

    // function to validate the token based on payload
    async validate (payload : JwtPayload) : Promise <User> {
        
        const { username } = payload;
        const user = await this.userRepository.findOne({ username });
        
        if (!user){
            throw new UnauthorizedException("no");
        }
        
        delete user.password;
        delete user.salt;
        
        return user;

    }
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRucmFtYWxobyIsImlhdCI6MTU4NjgwNDExMiwiZXhwIjoxNTg2ODA3NzEyfQ.D0oVVs7K3fmRf8cLVa5NsOllrEqLWMVpqzdV_xB93Wk