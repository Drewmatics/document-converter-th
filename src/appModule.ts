import { Module } from "@nestjs/common";
import { HealthCheckController } from "./controllers/healthCheckController";
import { HealthCheckService } from "./services/healthCheckService";
import { DocumentsController } from "./controllers/documentsController";

@Module({
  imports: [],
  controllers: [HealthCheckController, DocumentsController],
  providers: [HealthCheckService],
})
export class AppModule {}
