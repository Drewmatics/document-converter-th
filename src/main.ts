import { NestFactory } from "@nestjs/core";
import { AppModule } from "./appModule";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //set HTTP headers for security, XSS prevention
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
