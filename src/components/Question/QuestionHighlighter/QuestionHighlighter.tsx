import Highlight, { defaultProps, Language } from "prism-react-renderer";
import LightTheme from "prism-react-renderer/themes/github";
import DarkTheme from "prism-react-renderer/themes/vsDark";
import Prism from "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-git";
import "prismjs/components/prism-java";
import { useThemeSettings } from "../../../hooks";
import { HighlighterProps, TQuestionType } from "../../../types";
import "./QuestionHighlighter.scss";

export interface QuestionHighlighterProps extends HighlighterProps {
  type: TQuestionType;
  fibRefs: React.MutableRefObject<React.RefObject<HTMLInputElement>[]>;
  answers: string[];
  image?: string;
}

export default function QuestionHighlighter(props: QuestionHighlighterProps) {
  const { code, language, type, fibRefs, answers, image } = props;
  const { theme } = useThemeSettings();
  return <Highlight {...defaultProps} theme={theme.palette.type === "dark" ? DarkTheme : LightTheme} code={code.trim()} language={language.trim() as Language} Prism={Prism as any}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => {
      let current_fib_index = -1;
      return <pre className={className + " QuestionHighlighter-pre"} style={{ ...style, backgroundColor: theme.color.dark, width: image ? "50%" : "100%" }}>
        {tokens.map((line, i) => {
          let line_contents = [];
          for (let i = 0; i < line.length; i++) {
            const token = line[i];
            if (type === "FIB" && token.content === "%" && line[i + 1].content === "_" && line[i + 2].content === "%") {
              current_fib_index++;
              line_contents.push(<input style={{ color: theme.palette.text.primary, backgroundColor: theme.color.light, width: answers[current_fib_index].split(",")[0].length * 10 + 5 }} key={i} spellCheck={false} className="Highlighter-FIB-Code" ref={fibRefs.current[current_fib_index]} />)
              i += 2;
            }
            else line_contents.push(<span key={i} {...getTokenProps({ token, key: i })} />)
          }
          const line_props = getLineProps({ line, key: i });
          line_props.className = `${line_props.className} QuestionHighlighter-pre-line`
          return <div key={i} {...line_props}>
            <span className="QuestionHighlighter-pre-line-num" style={{ backgroundColor: theme.color.base }}>{i + 1}</span>
            <span className="QuestionHighlighter-pre-content">
              {line_contents.map(line_content => line_content)}
            </span>
          </div>
        })}
      </pre>
    }}
  </Highlight>
};