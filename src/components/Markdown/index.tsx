import { Typography } from "@material-ui/core";
import Prism from "prismjs";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

export interface MarkdownProps {
  content: string
}

export default function Markdown(props: MarkdownProps) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach(ref => {
      ref && Prism.highlightElement(ref)
    })
  });

  return <Typography component="div" className="p-5"><ReactMarkdown className="markdown p-5 bg-base" rehypePlugins={[rehypeRaw]} components={{
    code({ node, inline, className, children, ...props }) {
      return <code className={`${className ?? ''}`} {...props} ref={(ref) => refs.current.push(ref)}>{children}</code>
    }
  }}>{props.content}</ReactMarkdown></Typography>
}