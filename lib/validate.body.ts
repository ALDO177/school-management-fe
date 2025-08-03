import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateBody<T>(dtoClass: new () => T, body: any): Promise<[T, string[]]> {
  const instance = plainToInstance(dtoClass, body);
  const errors = await validate(instance as any);
  
  if (errors.length > 0) {
    const messages = errors.flatMap(err =>
      Object.values(err.constraints || {})
    );
    return [instance, messages];
  }

  return [instance, []];
}
