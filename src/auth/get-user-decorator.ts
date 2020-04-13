import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

// This will export a new decorator as @GetUser()  to be used
// as a parameter
export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});