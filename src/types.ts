import { Theme, ThemeOptions } from '@material-ui/core/styles';

// Basic Components

export interface IErrorLog {
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

export interface IPlaySettingsOptions {
  shuffle_options: boolean;
  shuffle_quizzes: boolean;
  shuffle_questions: boolean;
  instant_feedback: boolean;
  flatten_mix: boolean;
  partial_score: boolean;
  disable_timer: boolean;
}

export type TNumberOperator = '=' | '<=' | '<>' | '>=' | '<' | '>' | '!' | '><';
export type TNumberFilter = [TNumberOperator, [number, number?]];
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

export interface IQuizPartial {
  topic: string;
  subject: string;
  _id?: string;
  default?: Partial<IQuizDefaultSettings>;
  questions: TQuestionPartial[];
  contexts?: string[];
}

export interface IQuizFull extends QuizIdentifiers {
  questions: TQuestionFull[];
  default: Partial<IQuizDefaultSettings>;
  contexts: string[];
}

export interface IPlaySettings {
  options: IPlaySettingsOptions;
  filters: IPlaySettingsFilters;
}

export type TQuestionType = 'MCQ' | 'MS' | 'FIB' | 'Snippet';
export type TQuestionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export interface IQuestionPartial {
  type?: TQuestionType;
  image?: string | null;
  weight?: number;
  time_allocated?: number;
  difficulty?: TQuestionDifficulty;
  hints?: string[];
  _id?: string;
  contexts?: number | number[];
}

export interface SelectionQuestionOptions {
  text: string;
  index: string;
}

export type TSelectionPartialQuestionAnswer =
  | string
  | ISelectionQuestionAnswerPartial
  | (string | ISelectionQuestionAnswerPartial)[];

export interface IMcqQuestionPartial extends IQuestionPartial {
  question: string;
  options: string[];
  type?: 'MCQ';
  answers: TSelectionPartialQuestionAnswer;
}

export interface IMsQuestionPartial extends IQuestionPartial {
  question: string;
  options: string[];
  type?: 'MS';
  answers: TSelectionPartialQuestionAnswer;
}

export type TInputPartialQuestionAnswer =
  | IInputQuestionAnswerPartial
  | string
  | (
      | IInputQuestionAnswerPartial[]
      | IInputQuestionAnswerPartial
      | string
      | string[]
    )[];
export interface ISnippetQuestionPartial extends IQuestionPartial {
  question: string;
  type?: 'Snippet';
  answers: TInputPartialQuestionAnswer;
}

export interface IFibQuestionPartial extends IQuestionPartial {
  question: string[];
  type?: 'FIB';
  answers: TInputPartialQuestionAnswer;
  format?: 'code' | 'text';
}

export type TQuestionAnswerModifiers = 'IC' | 'IS';

interface IRegex {
  regex: string;
  flags: string;
}

export interface IInputQuestionAnswerPartial {
  text: string;
  modifiers?: TQuestionAnswerModifiers[];
  regex?: IRegex;
  explanation?: string | null;
}

export interface ISelectionQuestionAnswerPartial {
  text: string;
  explanation?: string | null;
}

export interface IMcqQuestionFull extends IQuestionFull {
  question: string;
  options: SelectionQuestionOptions[];
  type: 'MCQ';
  answers: ISelectionQuestionAnswerFull[];
}

interface IQuestionFull extends Required<IQuestionPartial> {
  contexts: number[];
  quiz: string;
}
export interface IMsQuestionFull extends IQuestionFull {
  question: string;
  options: SelectionQuestionOptions[];
  type: 'MS';
  answers: ISelectionQuestionAnswerFull[];
}

export interface IInputQuestionAnswerFull {
  text: string;
  modifiers: TQuestionAnswerModifiers[];
  regex: IRegex | null;
  explanation: string | null;
}

export interface ISelectionQuestionAnswerFull {
  text: string;
  explanation: string | null;
}

export interface ISnippetQuestionFull extends IQuestionFull {
  question: string;
  options: null;
  type: 'Snippet';
  answers: IInputQuestionAnswerFull[][];
}

export interface IFibQuestionFull extends IQuestionFull {
  question: string[];
  options: null;
  type: 'FIB';
  answers: IInputQuestionAnswerFull[][];
  format?: 'code' | 'text';
}

export type TInputQuestionPartial =
  | ISnippetQuestionPartial
  | IFibQuestionPartial;
export type TSelectionQuestionPartial =
  | IMcqQuestionPartial
  | IMsQuestionPartial;

export type TQuestionPartial =
  | TInputQuestionPartial
  | TSelectionQuestionPartial;

export type TInputQuestionFull = ISnippetQuestionFull | IFibQuestionFull;
export type TSelectionQuestionFull = IMcqQuestionFull | IMsQuestionFull;

export type TQuestionFull = TInputQuestionFull | TSelectionQuestionFull;

export interface QuizIdentifiers {
  topic: string;
  _id: string;
  subject: string;
}

export type IResultSelectionQuestion = Omit<
  TSelectionQuestionFull,
  'options'
> & {
  options: (SelectionQuestionOptions & {
    isCorrect: boolean;
    userSelected: boolean;
  })[];
};

export type IResultInputSnippetQuestion = Omit<
  ISnippetQuestionFull,
  'answers'
> & {
  answers: (IInputQuestionAnswerFull & {
    isCorrect?: boolean;
  })[][];
};

export type IResultInputFibQuestion = Omit<IFibQuestionFull, 'answers'> & {
  answers: (IInputQuestionAnswerFull & {
    isCorrect?: boolean;
  })[][];
};

export type TResultInputQuestion =
  | IResultInputSnippetQuestion
  | IResultInputFibQuestion;

export type TResultQuestion = IResultSelectionQuestion | TResultInputQuestion;

export interface IResult {
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
  question: TResultQuestion;
  _id: string;
}

export interface IReport {
  settings: IPlaySettings;
  results: IResult[];
  createdAt: number;
  quizzes: Record<string, Omit<IQuizFull, 'questions'>>;
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

export type Color = {
  dark: string;
  base: string;
  light: string;
  opposite_dark: string;
  opposite_base: string;
  opposite_light: string;
};

export interface ExtendedThemeOptions extends ThemeOptions {
  color: Color;
  theme: AllowedTheme;
}

export interface ExtendedTheme extends Theme {
  color: Color;
  theme: AllowedTheme;
}

export type AllowedTheme = 'dark' | 'light' | 'polar_night' | 'snow_storm';
export interface ISettings {
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
}

export interface IPreset<D> {
  current: string;
  presets: {
    name: string;
    id: string;
    data: D;
  }[];
}
export interface IReportSettings {
  export: IReportExport;
  aggregator: IReportAggregator;
  filters: IReportFilter;
  sort: IReportSort;
}

export interface ISettingsPreset extends IPreset<ISettings> {}
export interface IPlaySettingsPreset extends IPreset<IPlaySettings> {}
export interface IReportSettingsPreset extends IPreset<IReportSettings> {}

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

export interface IReportExport {
  export_type: 'Quizzes' | 'Report';
  export_as: 'JSON' | 'YAML';
}

export interface IPlayDownloadedState {
  questions: TQuestionFull[];
  results: Omit<IResult, 'question'> & { question: string }[];
  playSettings: IPlaySettings;
  quizzes: Omit<IQuizFull, 'questions'>[];
}
