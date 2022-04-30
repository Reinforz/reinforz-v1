export type TQuestionType = 'MCQ' | 'MS' | 'FIB' | 'Snippet';
export type TQuestionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type TNumberOperator = '=' | '<=' | '<>' | '>=' | '<' | '>' | '!' | '><';
export type TNumberFilter = [TNumberOperator, [number, number?]];
export type TQuestionAnswerModifiers = 'IC' | 'IS';
export type AllowedTheme = 'dark' | 'light' | 'polar_night' | 'snow_storm';

export interface QuizIdentifiers {
  topic: string;
  _id: string;
  subject: string;
}

export interface IErrorLog {
  // quiz.subject - quiz.topic
  quiz: string;
  target: string;
  message: string;
  level: 'ERROR' | 'WARN';
  _id: string;
  quiz_id: string;
}

export interface ILog {
  warns: string[];
  errors: string[];
}

export interface IGlobalSettings {
  theme: AllowedTheme;
  animation: boolean;
  hovertips: boolean;
  shortcuts: boolean;
  sound: boolean;
  navigation: {
    x: 'center' | 'left' | 'right';
    y: 'center' | 'top' | 'bottom';
    direction: 'column' | 'row';
  };
  font: 'monospace' | 'sans-serif' | 'serif';
  color: {
    primary: string;
  };
}

export interface IPlaySettingsOptions {
  shuffle_options: boolean;
  shuffle_quizzes: boolean;
  shuffle_questions: boolean;
  instant_feedback: boolean;
  flatten_mix: boolean;
  partial_score: boolean;
  disable_timer: boolean;
}

export interface IPlaySettingsFilters {
  time_allocated: TNumberFilter;
  excluded_difficulty: TQuestionDifficulty[];
  excluded_types: TQuestionType[];
}

export interface IQuizDefaultSettings {
  difficulty: TQuestionDifficulty | null;
  time_allocated: number | null;
  weight: number | null;
  contexts: number | number[] | null;
}

// Shape of the question user will provide when **uploading**
export interface InputQuestion {
  type?: TQuestionType;
  image?: string | null;
  weight?: number;
  time_allocated?: number;
  difficulty?: TQuestionDifficulty;
  hints?: string[];
  _id?: string;
  contexts?: number | number[];
}

// Shape of the quiz user will provide when **uploading**
export interface InputQuiz {
  topic: string;
  subject: string;
  _id?: string;
  default?: Partial<IQuizDefaultSettings>;
  questions: TInputQuestion[];
  contexts?: string[];
}

export interface InputSelectQuestionAnswerDetailed {
  text: string;
  explanation?: string | null;
}

export type InputSelectQuestionAnswer =
  | string
  | InputSelectQuestionAnswerDetailed
  | (string | InputSelectQuestionAnswerDetailed)[];

// select type input question (mcq/ms)
export interface InputSelectQuestion {
  question: string;
  options: string[];
  answers: InputSelectQuestionAnswer;
}

export interface InputMcqQuestion extends InputQuestion, InputSelectQuestion {
  type?: 'MCQ';
}

export interface InputMsQuestion extends InputQuestion, InputSelectQuestion {
  type?: 'MS';
}

interface IRegex {
  regex: string;
  flags: string;
}

export interface InputTypeQuestionAnswerDetailed {
  text: string;
  modifiers?: TQuestionAnswerModifiers[];
  regex?: IRegex;
  explanation?: string | null;
}

export type InputTypeQuestionAnswer =
  | InputTypeQuestionAnswerDetailed
  | string
  | (
      | InputTypeQuestionAnswerDetailed[]
      | InputTypeQuestionAnswerDetailed
      | string
      | string[]
    )[];

export interface InputSnippetQuestion extends InputQuestion {
  question: string;
  type?: 'Snippet';
  answers: InputTypeQuestionAnswer;
}

export interface IFibTextQuestion {
  type: 'text'
  text: string
}

export interface IFibCodeQuestion {
  type: 'code'
  text: string
  lang: string
}

export type TFibQuestion = IFibTextQuestion | IFibCodeQuestion

export interface InputFibQuestion extends InputQuestion {
  question: TFibQuestion[];
  type?: 'FIB';
  answers: InputTypeQuestionAnswer;
}

export type TInputSelectQuestion = InputMcqQuestion | InputMsQuestion;
export type TInputTypeQuestion = InputSnippetQuestion | InputFibQuestion;
export type TInputQuestion = TInputSelectQuestion | TInputTypeQuestion;

// Post processed shapes
// Shape of question after preprocessing
export interface IQuestion extends Required<InputQuestion> {
  contexts: number[];
  quiz: string;
}

// Shape of the quiz after post processing
export interface IQuiz extends QuizIdentifiers {
  questions: TQuestion[];
  default: Partial<IQuizDefaultSettings>;
  contexts: string[];
}

export interface IPlaySettings {
  options: IPlaySettingsOptions;
  filters: IPlaySettingsFilters;
}

export interface SelectQuestionOptions {
  text: string;
  index: string;
}

export interface SelectQuestionAnswerDetailed {
  text: string;
  explanation?: string | null;
}

export interface TypeQuestionAnswerDetailed {
  text: string;
  modifiers: TQuestionAnswerModifiers[];
  regex: IRegex | null;
  explanation: string | null;
}

export interface SelectQuestion {
  question: string;
  options: SelectQuestionOptions[];
  answers: SelectQuestionAnswerDetailed[];
}

export interface IMcqQuestion extends IQuestion, SelectQuestion {
  type: 'MCQ';
}

export interface IMsQuestion extends IQuestion, SelectQuestion {
  type: 'MS';
}

export interface ISnippetQuestion extends IQuestion {
  question: string;
  type: 'Snippet';
  answers: TypeQuestionAnswerDetailed[][];
}

export interface IFibQuestion extends IQuestion {
  question: TFibQuestion[];
  type: 'FIB';
  answers: TypeQuestionAnswerDetailed[][];
}

export type TSelectQuestion = IMcqQuestion | IMsQuestion;
export type TTypeQuestion = ISnippetQuestion | IFibQuestion;
export type TQuestion = TSelectQuestion | TTypeQuestion;

// Result interfaces
// Result interface of select type questions (mcq/ms)
export type ISelectQuestionResult = Omit<
  TSelectQuestion,
  'options'
> & {
  options: (SelectQuestionOptions & {
    isCorrect: boolean;
    userSelected: boolean;
  })[];
};

export type ISnippetQuestionResult = Omit<
  ISnippetQuestion,
  'answers'
> & {
  answers: (TypeQuestionAnswerDetailed & {
    isCorrect?: boolean;
  })[][];
};

export type IFibQuestionResult = Omit<IFibQuestion, 'answers'> & {
  answers: (TypeQuestionAnswerDetailed & {
    isCorrect?: boolean;
  })[][];
};

export type TInputQuestionResult =
  | IFibQuestionResult
  | ISnippetQuestionResult;

export type TQuestionResult = TInputQuestionResult | ISelectQuestionResult;

export interface IQuestionResult {
  user_answers: string[];
  verdict: boolean;
  score: {
    amount: number;
    time: number;
    hints: number;
    answers: number;
  };
  time_taken: number;
  hints_used: number;
  question: TQuestionResult;
  _id: string;
}

export interface IReport {
  settings: IPlaySettings;
  results: IQuestionResult[];
  createdAt: number;
  quizzes: Record<string, Omit<IQuiz, 'questions'>>;
}

export interface IReportExport {
  export_type: 'Quizzes' | 'Report';
  export_as: 'JSON' | 'YAML';
}

export type TNumberAggregation =
  | 'MIN'
  | 'MAX'
  | 'AVG'
  | 'MEDIAN'
  | 'MODE'
  | 'STDDEV'
  | 'VARIANCE';
export type TBooleanAggregation = 'TRUE' | 'FALSE';

export interface IReportAggregator {
  time_allocated: TNumberAggregation;
  time_taken: TNumberAggregation;
  weight: TNumberAggregation;
  score: TNumberAggregation;
  verdict: TBooleanAggregation;
  hints_used: TNumberAggregation;
  weighted_score: TNumberAggregation;
}

export interface IReportSettings {
  export: IReportExport;
  aggregator: IReportAggregator;
  filters: IReportFilter;
  sort: IReportSort;
}

export interface IReportFilter {
  time_taken: TNumberFilter;
  score: TNumberFilter;
  hints_used: TNumberFilter;
  verdict: boolean | 'any';
  excluded_types: TQuestionType[];
  excluded_difficulty: TQuestionDifficulty[];
  excluded_quizzes: string[];
  excluded_topics: string[];
  excluded_subjects: string[];
  excluded_columns: string[];
}

export type IReportSort = [string, 'ASC' | 'DESC'][];
export interface IPresetConfig<D> {
  current: string;
  presets: {
    name: string;
    id: string;
    data: D;
  }[];
}

export interface IGlobalSettingsPresetConfig extends IPresetConfig<IGlobalSettings> {}
export interface IPlaySettingsPresetConfig extends IPresetConfig<IPlaySettings> {}
export interface IReportSettingsPresetConfig extends IPresetConfig<IReportSettings> {}

export interface IPlayDownloadedState {
  questions: TQuestion[];
  results: Omit<IQuestionResult, 'question'> & { question: string }[];
  playSettings: IPlaySettings;
  quizzes: Omit<IQuiz, 'questions'>[];
}