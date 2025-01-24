import { Module } from "@nestjs/common";
import { HealthCheckController } from "./controllers/healthCheckController";
import { HealthCheckService } from "./services/healthCheckService";
import { DocumentsController } from "./controllers/documentsController";
import { DocumentsService } from "./services/documentsService";

@Module({
  imports: [],
  controllers: [HealthCheckController, DocumentsController],
  providers: [HealthCheckService, DocumentsService],
})
export class AppModule {}
