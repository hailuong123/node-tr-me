import { Observable } from 'rxjs';
import { validate, registerDecorator, ValidationOptions } from 'class-validator';
// import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { ValidateError } from 'error.lib';
import { ObjectID } from 'mongodb';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

export let isValid = <T>(clazzInstance: T): Observable<T> => {
  return Observable
    .fromPromise(validate(clazzInstance))
    .map(errors => {
      if (errors.length > 0) {
        throw new ValidateError(errors);
      }
      return clazzInstance;
    });
};

@ValidatorConstraint({ async: true })
class IsNotEmptyObjectConstraint implements ValidatorConstraintInterface {
  validate(obj: object, args: ValidationArguments) {
    return (Object.keys(obj).length !== 0);
  }
}
export function IsNotEmptyObject(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
      registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsNotEmptyObjectConstraint
      });
  };
}
@ValidatorConstraint({ async: true })
class IsNumberUppercaseStringConstraint implements ValidatorConstraintInterface {
  validate(string: string, args: ValidationArguments) {
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).test(string);
  }
}
export function IsNumberUppercaseString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNumberUppercaseStringConstraint
        });
    };
}

@ValidatorConstraint({ async: true })
export class IsNumberString implements ValidatorConstraintInterface {
  validate(numberString: string, args: ValidationArguments) {
    const constraints = (args as any).constraints;
    if (constraints[0] && constraints[0].canEmpty && !numberString) {
      return true;
    }
    return /^[-+]?[0-9]+$/.test(numberString);
  }
}

@ValidatorConstraint({ async: true })
export class MaxLengthValid implements ValidatorConstraintInterface {
  validate(numberString: string, args: ValidationArguments) {
    const constraints = (args as any).constraints;
    if (constraints[0] && constraints[0].canEmpty && !numberString) {
      return true;
    }
    if (constraints[0] && constraints[0].maxLength < numberString.length) {
      return false;
    }
    return true;
  }
}

@ValidatorConstraint({ async: true })
export class TranxHashValid implements ValidatorConstraintInterface {
  validate(hash: string, args: ValidationArguments) {
    return hash.startsWith('0x') && hash.length === 66;
  }
}

@ValidatorConstraint({ async: false })
export class IsInEnum implements ValidatorConstraintInterface {

  validate(type: string, args: ValidationArguments) {
    return type in (args.constraints[0] || {});
  }

  defaultMessage(args: ValidationArguments) {
    return 'value.not_in_enum';
  }
}
/*
  Example:
  @Validate(CheckInstanceExists, [countMaster, ['user_id', { value: 'master_id', map: '_id' }], {allowEmpty: true}], {
    message: 'mascontent.master_id.not_exists'
  })
*/
@ValidatorConstraint({ async: true })
export class CheckInstanceExists implements ValidatorConstraintInterface {

  validate(ins_id: ObjectID, args: ValidationArguments) {
    const object = (args as any).object;
    const query: any = { _id: new ObjectID(ins_id) };
    const options = (args.constraints[2] || {}) as any;
    if (!ins_id) {
      return !!options.allowEmpty;
    }
    (args.constraints[1] as Array<any>).forEach(key => {
      if (typeof key === 'string') {
        query[key] = new ObjectID(object[key]);
      } else {
        query[key.map] = new ObjectID(object[key.value]);
      }
    });
    return (args.constraints[0](query) as Promise<number>).then(result => {
      return result >= 1;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return 'instance.not_exists';
  }
}

/*
  Example:
  @Validate(ArrayFormat, [['text', 'value'], { allowEmtpy: false, equalProperties: false }], {
    message: 'content.data.invalid'
  })
*/
@ValidatorConstraint({ async: false })
export class ArrayFormat implements ValidatorConstraintInterface {

  validate(arr: any[], args: ValidationArguments) {
    const keys: any[] = args.constraints[0] || [], cond: any = args.constraints[1] || {};
    if (cond.allowEmpty && (!arr || !arr.length)) {
      return true;
    }
    return !arr.some((arr_item: any): any => {
      const cur_keys = Object.keys(arr_item);
      if (cond.equalProperties && cur_keys.length !== keys.length) { return true; }

      return keys.some((key: string): any => {
        if (cur_keys.indexOf(key) === -1) {
          return true;
        }
        return arr_item[key] === '' && arr_item[key] !== undefined;
      });
    });
  }

  defaultMessage(args: ValidationArguments) {
    return 'arrray.object_invalid';
  }
}