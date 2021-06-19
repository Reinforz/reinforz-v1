import { Typography } from "@material-ui/core";
import Prism from "prismjs";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

export interface MarkdownProps {
  content: string
  classNames?: {
    typography?: string
    markdown?: string
  }
}

export default function Markdown(props: MarkdownProps) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const { classNames = {} } = props;

  useEffect(() => {
    refs.current.forEach(ref => {
      ref && Prism.highlightElement(ref)
    })
  });

  return <Typography component="div" className={`p-5 ${classNames.typography ?? ''}`}><ReactMarkdown className={`markdown ${classNames.markdown ?? ''}`} rehypePlugins={[rehypeRaw]} components={{
    code({ node, inline, className, children, ...props }) {
      return <code className={`${className ?? ''}`} {...props} ref={(ref) => refs.current.push(ref)}>{children}</code>
    }
  }}>{props.content}</ReactMarkdown></Typography>
}