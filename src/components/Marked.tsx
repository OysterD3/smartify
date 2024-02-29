import Markdown, { ReactRenderer } from 'marked-react';
import { createBEM } from '@/utils';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import '@/styles/markdown.scss';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

const bem = createBEM('markdown');
const codeBEM = createBEM('markdown-code');

const renderer: Partial<ReactRenderer> = {
  list(body, ordered) {
    return <ul className={bem('list', { ordered })}>{body}</ul>;
  },
  listItem(text) {
    return <li className={bem('list-item')}>{text}</li>;
  },
  heading(text, level) {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;
    return (
      <Component className={bem('heading', [`h${level}`])}>{text}</Component>
    );
  },
  text(text) {
    return <span className={bem('text')}>{text}</span>;
  },
  paragraph(text) {
    return <p className={bem('paragraph')}>{text}</p>;
  },
  blockquote(quote) {
    return <blockquote className={bem('blockquote')}>{quote}</blockquote>;
  },
  code(code, lang) {
    const language = hljs.getLanguage(lang as string)
      ? (lang as string)
      : 'plaintext';
    const highlighted = hljs.highlight(code as string, { language }).value;

    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(code as string);
      toast.success('Copied to clipboard');
    };

    return (
      <div className={codeBEM('container')}>
        <div className={codeBEM('action-bar')}>
          <span className={codeBEM('language')}>{lang}</span>
          <span onClick={copyToClipboard} className={codeBEM('copy')}>
            Copy
          </span>
        </div>
        <ScrollArea>
          <pre>
            <code
              className={`hljs language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            ></code>
          </pre>
        </ScrollArea>
      </div>
    );
  },
};

const Marked = ({ value }: { value: string }) => {
  return <Markdown value={value} renderer={renderer} />;
};

export default Marked;
