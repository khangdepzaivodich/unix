import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
// import cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './core/response.interceptor';
// import { SupabaseAuthGuard } from './auth/supabase-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // app.useGlobalGuards(new SupabaseAuthGuard());
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.use(cookieParser());
  app.setGlobalPrefix("api");

  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
  });
  await app.listen(configService.get<any>('PORT') || 3000);
}

bootstrap();
