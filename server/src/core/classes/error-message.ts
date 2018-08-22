import {SugoiError} from "@sugoi/core";

export class ErrorMessage extends SugoiError{
  constructor(status: number,
              message: string,
              public timestamp = new Date()) {
    super(message,status)
  }
}
