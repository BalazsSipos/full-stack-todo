import { validate } from 'class-validator';

export interface ErrorList {
  [key: string]: string | undefined;
}

export async function validateIncomingFormData<T extends object>(todoData: T): Promise<ErrorList | undefined> {
  const result = await validate(todoData);
  const errorList: ErrorList = {};
  if (result.length > 0) {
    result.forEach((validationError) => {
      errorList[validationError.property] = validationError.constraints
        ? Object.values(validationError.constraints).join(', ')
        : '';
    });
    return errorList;
  }
}
