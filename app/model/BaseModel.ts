interface BaseModelAction {
  getName(): string;
  getClassName(): string;
  toJSON?(): string;
}

export abstract class BaseModel implements BaseModelAction {
  public name: string | undefined;
  constructor() {
    this.name = this.constructor.name;
  }

  getName(): string {
    return this.name || this.constructor.name;
  }

  getClassName(): string {
    return this.name || this.constructor.name;
  }

  toJSON?(): string | any {
    return "";
  }
}
