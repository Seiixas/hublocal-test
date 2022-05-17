import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowPlaceUseCase } from './show-place-use-case';

class ShowPlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPlaceUseCase = container.resolve(ShowPlaceUseCase);

    const place = await showPlaceUseCase.execute(id);

    return response.json(place);
  }
}

export { ShowPlaceController };
