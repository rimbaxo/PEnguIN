import { type Control } from 'react-hook-form';

export declare namespace PropTypes {
  interface Question {
    id: number;
    text: string;
    isInverted: boolean;
  }
  interface CbaForm {
    questions: Question[];
  }
  interface CbaQuestion {
    item: Question;
    control: Control<FormValues>;
    isStepValid: () => Promise<boolean>;
  }
  interface CbaStepper {
    steps: number;
    activeStep: number;
    handleNext: () => void;
    handleBack: () => void;
    handleSubmit: () => void;
  }
  interface CbaWizzard {
    questions: Question[];
    control: Control<FormValues>;
    isStepValid: () => Promise<boolean>;
  }
}

declare global {
  interface FormValues {
    [key: string]: string;
  }
}
