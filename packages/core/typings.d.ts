import { FormInstance } from 'antd/es/form/Form';
import { NamePath, InternalNamePath } from 'antd/es/form/interface';

export { NamePath };

export declare type SchemaType = 'string' | 'number' | 'boolean' | 'integer' | 'object' | 'array' | null;

export declare type SchemaEnum = Array<string | number | { label: string; value: any; [key: string]: any }>;

export declare type SchemaItems<DecoratorProps, ComponentProps> = any;

export declare type Stringify<
  P extends {
    [key: string]: any;
  },
> = {
  [key in keyof P]?: P[key] | string;
};

export declare type SchemaProperties<DecoratorProps, ComponentProps> = Record<
  string,
  ISchema<DecoratorProps, ComponentProps>
>;

export declare type ISchema<DecoratorProps = any, ComponentProps = any> = {
  $ref?: string;
  $schema?: string;
  title?: string;
  description?: string;
  default?: any;
  readOnly?: boolean;
  whiteOnly?: boolean;
  type?: SchemaType;
  enum?: SchemaEnum;
  enumNames?: SchemaEnum;
  const?: any;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string | RegExp;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxContains?: number;
  minContains?: number;
  maxProperties?: number;
  minProperties?: number;
  required?: string[] | boolean | string;
  format?: string;

  definitions?: SchemaProperties<DecoratorProps, ComponentProps>;
  properties?: SchemaProperties<DecoratorProps, ComponentProps>;
  items?: SchemaProperties<DecoratorProps, ComponentProps>;
  additionalItems?: SchemaProperties<DecoratorProps, ComponentProps>;
  patternProperties?: SchemaProperties<DecoratorProps, ComponentProps>;
  additionalProperties?: SchemaProperties<DecoratorProps, ComponentProps>;
  oneOf?: ISchema<DecoratorProps, ComponentProps>[];
  anyOf?: ISchema<DecoratorProps, ComponentProps>[];
  allOf?: ISchema<DecoratorProps, ComponentProps>[];
  if?: ISchema<DecoratorProps, ComponentProps>;
  then?: ISchema<DecoratorProps, ComponentProps>;
  else?: ISchema<DecoratorProps, ComponentProps>;

  // 非标准
  widget?: string;
  props?: ComponentProps;
  decoratorProps?: DecoratorProps;
  hidden?: boolean | string;

  // 兼容其他写法
  [x: string]: any;
};

export interface IUseFormProps {
  watch?: Record<string, (value: any, key: string) => void>;
  defaultOpenKeys?: Record<string, boolean>;
  defaultExpandAll?: boolean;
  expandExclusion?: boolean;
}

export interface ICollapse {
  getOpenKey(name: string): boolean;
  setOpenKey(name: string, value: boolean): void;
}

export interface IFormField extends FormInstance, ICollapse {
  __options: IUseFormProps;
  getValue<T>(name: string): T;
  setValue<T>(name: string, value: T): void;
  getValues<T>(names?: NamePath[], filterFunc?: (meta: any) => boolean): T;
  setValues(obj: any): void;
  setValues<T>(obj: T): void;
  reset(names?: NamePath[]): void;
  watch(name: NamePath): any;
  calculatePropsValue(namePath: InternalNamePath, props: Record<string, any>): any;

  /**
   * Form component should register some content into store.
   * We pass the `HOOK_MARK` as key to avoid user call the function.
   */
  getInternalHooks: (secret: string) => InternalHooks | null;
  /** @private Internal usage. Do not use it in your production */
  _init?: boolean;
}

export declare type IFormRender<DecoratorProps, ComponentProps> = {
  field?: IFormField;
  name?: string;
  layout?: Record<string, any>;
  schema?: ISchema<DecoratorProps, ComponentProps>;
  isPreview?: boolean;
  disabled?: boolean;
  urlChecked?: boolean | { reg: RegExp; errText: string };
  metaKey?: Array<string | number>;
  namePath?: Array<string | number>;
  colSpan?: number;
  hasSubmitBtn?: boolean;
  schemaUi?: Record<string, any>;
  watch?: Record<string, any>;
  onFinish?: (values: any) => void;
  onChange?: (changedValues: any, values: any) => void;
  onMount?: (field: IFormField) => void;
};

export interface IObjectField<DecoratorProps, ComponentProps>
  extends Exclude<ISchema, 'required'>,
    IFormRender<DecoratorProps, ComponentProps> {
  required: boolean | string[];
  children?: any;
}

export interface IField<DecoratorProps, ComponentProps>
  extends Exclude<ISchema, 'required'>,
    IFormRender<DecoratorProps, ComponentProps> {
  required: boolean;
  children?: any;
}

export interface IArrayField<DecoratorProps, ComponentProps>
  extends Exclude<ISchema, 'required'>,
    IFormRender<DecoratorProps, ComponentProps> {
  required: boolean | string[];
  children?: any[];
  min?: number;
  max?: number;
  items?: SchemaProperties<DecoratorProps, ComponentProps>;
  dataSource?: any[];
  onAdd?: () => void;
  onRemove?: (index) => void;
  onCopy?: (index: number) => void;
  onUp?: (index: number) => void;
  onDown?: (index: number) => void;
}
