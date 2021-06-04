import Prism from "prismjs";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
// @ts-ignore
import remarkDisableTokenizers from "remark-disable-tokenizers";

interface Props {
  content: string
}

export default function Markdown(props: Props) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach(ref => {
      ref && Prism.highlightElement(ref)
    })
  });

  return <ReactMarkdown className="markdown" remarkPlugins={[
    [
      remarkDisableTokenizers,
      { inline: ["emphasis", "strong", "bold"] }
    ]
  ]} rehypePlugins={[rehypeRaw]} components={{
    code({ node, inline, className, children, ...props }) {
      return <code className={className} {...props} ref={(ref) => refs.current.push(ref)}>{children}</code>
    }
  }}>{props.content}</ReactMarkdown>
}