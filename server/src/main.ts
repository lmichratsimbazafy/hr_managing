import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  if (!configService.isProductionMode()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('RH management API')
        .setDescription('RH management API')
        .build(),
    );

    SwaggerModule.setup('docs', app, document);
  }
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
