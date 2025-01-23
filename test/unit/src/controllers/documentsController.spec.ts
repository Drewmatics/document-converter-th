import { Test, TestingModule } from "@nestjs/testing";
import { DocumentsController } from "../../../../src/controllers/documentsController";

describe("DocumentsController", () => {
  let controller: DocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
    }).compile();

    controller = module.get<DocumentsController>(DocumentsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
