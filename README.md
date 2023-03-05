## Description

Simple proof-of-concept that routes requests to different postgres schemas based on request header. Also uses [durable providers](https://docs.nestjs.com/fundamentals/injection-scopes#durable-providers) to not re-instantiate new services classes on every incoming request.

## Important Highlights

- `src/tenant:` handles logic to read headers and make accessible in the `TypeOrmModule.useFactory(options)`
- `src/app.module.ts` - TypeOrmModule factory function
- `src/user.service.ts` - note the `@Injectable({ scope: Scope.REQUEST, durable: true })` which makes the service request-scoped, but durable so only `n` instances of the service are created (where `n` is the number of tenants)
