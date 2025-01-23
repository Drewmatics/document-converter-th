import { Test, TestingModule } from "@nestjs/testing";
import { HealthCheckController } from "../../../../src/controllers/healthCheckController";
import { HealthCheckService } from "../../../../src/services/healthCheckService";

describe("HealthCheckController", () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  describe("root", () => {
    it("should return a Healthy status", () => {
      expect(healthCheckController.getHealthCheck()).toMatchObject({
        status: "Healthy",
      });
    });
  });
});
