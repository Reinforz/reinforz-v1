import { Theme, ThemeOptions } from '@material-ui/core/styles';
import { Language } from 'prism-react-renderer';

// Basic Components

export interface IErrorLog {
  quiz: string;
  target: string;
  message: string;
  level: 'ERROR' | 'WARN';
  _id: string;
  quiz_id: string;
}

export interface IPlaySettingsOptionsState {
  shuffle_options: boolean;
  shuffle_quizzes: boolean;
  shuffle_questions: boolean;
  instant_feedback: boolean;
  flatten_mix: boolean;
  partial_score: boolean;
}

export interface IPlaySettingsFiltersState {
  time_allocated: [number, number];
  excluded_difficulty: TQuestionDifficulty[];
  excluded_types: TQuestionType[];
}

export interface IQuizPartial {
  topic: string;
  subject: string;
  questions: TQuestionPartial[];
  _id?: string;
}

export interface IQuizFull {
  topic: string;
  subject: string;
  questions: TQuestionFull[];
  _id: string;
}

export interface IPlaySettings {
  options: IPlaySettingsOptionsState;
  filters: IPlaySettingsFiltersState;
}

export type TQuestionType = 'MCQ' | 'MS' | 'FIB' | 'Snippet';
export type TQuestionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface IQuestionPartial {
  type?: TQuestionType;
  image?: string | null;
  weight?: number;
  time_allocated?: number;
  difficulty?: TQuestionDifficulty;
  explanation?: string | null;
  hints?: string[];
  _id?: string;
}

export interface SelectionQuestionOptions {
  text: string;
  index: string;
}

export interface IMcqQuestionPartial extends IQuestionPartial {
  question: string;
  options: string[];
  type?: 'MCQ';
  answers: string[];
}

export interface IMsQuestionPartial extends IQuestionPartial {
  question: string;
  options: string[];
  type?: 'MS';
  answers: string[];
}

export interface ISnippetQuestionPartial extends IQuestionPartial {
  question: string;
  type?: 'Snippet';
  answers: IQuestionAnswerPartial[][];
}

export interface IFibQuestionPartial extends IQuestionPartial {
  question: string[];
  type?: 'FIB';
  answers: IQuestionAnswerPartial[][];
}

export type TQuestionAnswerModifiers = 'IC' | 'IS';

interface IRegex {
  regex: string;
  flags: string;
}

export interface IQuestionAnswerPartial {
  text: string;
  modifiers?: TQuestionAnswerModifiers[];
  regex?: IRegex;
}

export interface IMcqQuestionFull extends Required<IQuestionPartial> {
  question: string;
  options: SelectionQuestionOptions[];
  type: 'MCQ';
  answers: string[];
  quiz: QuizIdentifiers;
}

export interface IMsQuestionFull extends Required<IQuestionPartial> {
  question: string;
  options: SelectionQuestionOptions[];
  type: 'MS';
  answers: string[];
  quiz: QuizIdentifiers;
}

export interface IQuestionAnswerFull {
  text: string;
  modifiers: TQuestionAnswerModifiers[];
  regex: IRegex | null;
}

export interface ISnippetQuestionFull extends Required<IQuestionPartial> {
  question: string;
  options: null;
  type: 'Snippet';
  answers: IQuestionAnswerFull[][];
  quiz: QuizIdentifiers;
}

export interface IFibQuestionFull extends Required<IQuestionPartial> {
  question: string[];
  options: null;
  type: 'FIB';
  answers: IQuestionAnswerFull[][];
  quiz: QuizIdentifiers;
}

export type TQuestionPartial =
  | IFibQuestionPartial
  | ISnippetQuestionPartial
  | IMsQuestionPartial
  | IMcqQuestionPartial;
export type TQuestionFull =
  | IFibQuestionFull
  | ISnippetQuestionFull
  | IMsQuestionFull
  | IMcqQuestionFull;
export type TInputQuestionFull = ISnippetQuestionFull | IFibQuestionFull;
export type TSelectionQuestionFull = IMcqQuestionFull | IMsQuestionFull;
export interface HighlighterProps {
  code: string;
  language: Language;
}

export interface QuestionHighlighterProps extends HighlighterProps {
  type: TQuestionType;
  fibRefs: React.MutableRefObject<React.RefObject<HTMLInputElement>[]>;
  answers: string[];
  image?: string;
}

export interface QuizIdentifiers {
  topic: string;
  _id: string;
  subject: string;
}

export interface IResult {
  user_answers: string[];
  verdict: boolean;
  score: number;
  time_taken: number;
  hints_used: number;
  question_id: string;
}

export interface IMsQuestionResult extends IMsQuestionFull, IResult {}
export interface IMcqQuestionResult extends IMcqQuestionFull, IResult {}
export interface ISnippetQuestionResult extends ISnippetQuestionFull, IResult {}
export interface IFibQuestionResult extends IFibQuestionFull, IResult {}
export type TQuestionResult =
  | IMsQuestionResult
  | IMcqQuestionResult
  | ISnippetQuestionResult
  | IFibQuestionResult;

export interface IReportFilterState {
  time_taken: [number, number];
  verdict: boolean | 'mixed';
  hints_used: number | 'any';
  excluded_types: TQuestionType[];
  excluded_difficulty: TQuestionDifficulty[];
  excluded_quizzes: string[];
  excluded_columns: string[];
}

type color = {
  dark: string;
  base: string;
  light: string;
  opposite_dark: string;
  opposite_base: string;
  opposite_light: string;
};

export interface ExtendedThemeOptions extends ThemeOptions {
  color: color;
}

export interface ExtendedTheme extends Theme {
  color: color;
}

export type AllowedTheme = 'dark' | 'light';
export interface ISettings {
  theme: AllowedTheme;
  animation: boolean;
  hovertips: boolean;
}
export interface SettingsProps {
  settings: ISettings;
  setSettings: (settings: ISettings) => any;
}
