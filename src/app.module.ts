import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FeaturesModule } from './features';

@Module({
  imports: [ConfigModule.forRoot(), FeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
