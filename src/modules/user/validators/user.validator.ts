import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: true })
export class CheckExisted implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return (args.constraints[0](value) as Promise<number>).then(result => {
      return result === 0;
    });
  }
}
@ValidatorConstraint({ async: true })
export class CheckNotExisted implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return (args.constraints[0](value) as Promise<number>).then(result => {
      return result !== 0;
    });
  }
}
@ValidatorConstraint({ async: true })
export class CheckVerifyCaptcha implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return (args.constraints[0](value) as Promise<number>).then(result => {
      return result > 0;
    });
  }
}
