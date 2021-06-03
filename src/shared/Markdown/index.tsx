import Prism from "prismjs";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string
}

export function Markdown(props: Props) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach(ref => {
      ref && Prism.highlightElement(ref)
    })
  });

  return <ReactMarkdown className="markdown" components={{
    code({ node, inline, className, children, ...props }) {
      return <code className={className} {...props} ref={(ref) => refs.current.push(ref)}>{children}</code>
    }
  }}>{props.content}</ReactMarkdown>
}