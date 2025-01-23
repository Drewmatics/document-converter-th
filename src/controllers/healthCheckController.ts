import { Controller, Get } from "@nestjs/common";
import { HealthCheckService } from "../services/healthCheckService";

@Controller("health")
export class HealthCheckController {
  constructor(private readonly appService: HealthCheckService) {}

  @Get()
  getHealthCheck() {
    return this.appService.getHealthCheck();
  }
}
