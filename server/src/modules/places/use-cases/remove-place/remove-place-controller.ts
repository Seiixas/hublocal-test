import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemovePlaceUseCase } from './remove-place-use-case';

class RemovePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removePlaceUseCase = container.resolve(RemovePlaceUseCase);

    await removePlaceUseCase.execute(id);

    return response.status(204).send();
  }
}

export { RemovePlaceController };
