export class BaseControl<T>{
  value: T;
  key: string;
  label: string;
  tag: string;
  required: boolean;
  disabled: boolean;
  pattern: string;
  order: number;
  controlType: string;
  isUniqueBeaconRef: boolean;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      disabled?: boolean,
      pattern?: string,
      order?: number,
      controlType?: string,
      tag?: string,
      isUniqueBeaconRef?: boolean
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.tag = options.tag || '';
    this.required = !!options.required;
    this.disabled = !!options.disabled;
    this.pattern = options.pattern || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.isUniqueBeaconRef = !!options.isUniqueBeaconRef;
  }
}