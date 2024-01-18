import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

// console.log(process.env);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./src/config/.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      dialect: 'mysql',
      autoLoadModels: true,
      synchronize: false,
      logging() {
        // eslint-disable-next-line prefer-rest-params
        console.log('[MYSQL]', arguments?.[0], arguments?.[1]?.bind);
      },
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
