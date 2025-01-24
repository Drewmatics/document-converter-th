import { Controller, Get } from "@nestjs/common";
import { HealthCheckService } from "../services/healthCheckService";

@Controller("health")
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  getHealthCheck() {
    return this.healthCheckService.getHealthCheck();
  }
}
