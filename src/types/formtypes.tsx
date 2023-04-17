import { FieldValues, Path, UseControllerReturn } from 'react-hook-form';

export type ComponentProps<TFormInputs extends FieldValues> = {
  options?: string[];
  color?: string;
  renderProps: UseControllerReturn<TFormInputs, Path<TFormInputs>>;
};

export type Step<TFormInputs extends FieldValues> = {
  id: number;
  title: string;
  name: Path<TFormInputs>;
  component: <TFormInputs extends FieldValues>(props: ComponentProps<TFormInputs>) => JSX.Element;
  options?: string[];
  color?: string;
};

export type FormInputs = {
  A_time: string;
  B_where: string;
  C_withWho: string;
  D_what: string;
  E_whatsUp: string;
};

export type FormInputsConseguente = {
  A_whatAfter: string;
  B_what: string;
  C_emotions: string;
  D_intensity: string;
};

export type FormInputsBehaviour = {
  A_what: string;
};

export type FormInputCba = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  question10: string;
  question11: string;
  question12: string;
  question13: string;
  question14: string;
  question15: string;
  question16: string;
  question17: string;
  question18: string;
  question19: string;
  question20: string;
  question21: string;
  question22: string;
  question23: string;
  question24: string;
  question25: string;
  question26: string;
  question27: string;
  question28: string;
  question29: string;
  question30: string;
  question31: string;
  question32: string;
  question33: string;
  question34: string;
  question35: string;
  question36: string;
  question37: string;
  question38: string;
  question39: string;
  question40: string;
  question41: string;
  question42: string;
  question43: string;
  question44: string;
  question45: string;
  question46: string;
  question47: string;
  question48: string;
  question49: string;
  question50: string;
  question51: string;
  question52: string;
  question53: string;
  question54: string;
  question55: string;
  question56: string;
  question57: string;
  question58: string;
  question59: string;
  question60: string;
  question61: string;
  question62: string;
  question63: string;
  question64: string;
  question65: string;
  question66: string;
  question67: string;
  question68: string;
  question69: string;
  question70: string;
  question71: string;
  question72: string;
  question73: string;
  question74: string;
  question75: string;
  question76: string;
  question77: string;
  question78: string;
  question79: string;
  question80: string;
};
