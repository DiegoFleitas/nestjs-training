import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  await app.listen(port);
  console.log(
    `NestJS app running on [${process.env.NODE_ENV}] mode at... http://localhost:${port}`,
  );
}
bootstrap();
