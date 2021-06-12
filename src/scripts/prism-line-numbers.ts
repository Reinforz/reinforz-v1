export default function initPrismLineNumbers() {
  const { Prism } = window;
  if (typeof Prism === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const PLUGIN_NAME = 'line-numbers';

  const NEW_LINE_EXP = /\n(?!$)/g;

  /**
   * Global exports
   */
  const config = (Prism.plugins.lineNumbers = {
    getLine: function (element: Element, number: number) {
      if (
        element.tagName !== 'PRE' ||
        !element.classList.contains(PLUGIN_NAME)
      ) {
        return;
      }

      const lineNumberRows = element.querySelector('.line-numbers-rows');
      if (!lineNumberRows) {
        return;
      }
      const lineNumberStart =
        parseInt(element.getAttribute('data-start')!, 10) || 1;
      const lineNumberEnd =
        lineNumberStart + (lineNumberRows.children.length - 1);

      if (number < lineNumberStart) {
        number = lineNumberStart;
      }
      if (number > lineNumberEnd) {
        number = lineNumberEnd;
      }

      const lineIndex = number - lineNumberStart;

      return lineNumberRows.children[lineIndex];
    },

    resize: function (element: Element) {
      resizeElements([element]);
    },

    assumeViewportIndependence: true
  });

  /**
   * Resizes the given elements.
   *
   * @param {HTMLElement[]} elements
   */
  function resizeElements(elements: Element[]) {
    elements = elements.filter(function (e) {
      const codeStyles = getStyles(e)!;
      const whiteSpace = codeStyles['white-space' as any];
      return whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line';
    });

    if (elements.length === 0) {
      return;
    }

    const infos = elements
      .map(function (element) {
        const codeElement = element.querySelector('code');
        const lineNumbersWrapper = element.querySelector('.line-numbers-rows');
        if (!codeElement || !lineNumbersWrapper) {
          return undefined;
        }

        /** @type {HTMLElement} */
        let lineNumberSizer = element.querySelector(
          '.line-numbers-sizer'
        ) as HTMLSpanElement;
        const codeLines = codeElement.textContent!.split(NEW_LINE_EXP);

        if (!lineNumberSizer) {
          lineNumberSizer = document.createElement('span');
          lineNumberSizer.className = 'line-numbers-sizer';

          codeElement.appendChild(lineNumberSizer);
        }

        lineNumberSizer.innerHTML = '0';
        lineNumberSizer.style.display = 'block';

        const oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
        lineNumberSizer.innerHTML = '';

        return {
          element: element,
          lines: codeLines,
          lineHeights: [],
          oneLinerHeight: oneLinerHeight,
          sizer: lineNumberSizer
        };
      })
      .filter((element) => element!) as {
      element: Element;
      lines: string[];
      lineHeights: (number | undefined)[];
      oneLinerHeight: number;
      sizer: HTMLSpanElement;
    }[];

    infos.forEach(function (info) {
      const lineNumberSizer = info.sizer;
      const lines = info.lines;
      const lineHeights = info.lineHeights;
      const oneLinerHeight = info.oneLinerHeight;

      lineHeights[lines.length - 1] = undefined;
      lines.forEach(function (line, index) {
        if (line && line.length > 1) {
          const e = lineNumberSizer.appendChild(document.createElement('span'));
          e.style.display = 'block';
          e.textContent = line;
        } else {
          lineHeights[index] = oneLinerHeight;
        }
      });
    });

    infos.forEach(function (info) {
      const lineNumberSizer = info.sizer;
      const lineHeights = info.lineHeights;

      let childIndex = 0;
      for (let i = 0; i < lineHeights.length; i++) {
        if (lineHeights[i] === undefined) {
          lineHeights[i] = lineNumberSizer.children[
            childIndex++
          ].getBoundingClientRect().height;
        }
      }
    });

    infos.forEach(function (info) {
      const lineNumberSizer = info.sizer;
      const wrapper = info.element.querySelector(
        '.line-numbers-rows'
      )! as HTMLSpanElement;

      lineNumberSizer.style.display = 'none';
      lineNumberSizer.innerHTML = '';

      info.lineHeights.forEach(function (height, lineNumber) {
        (wrapper.children[lineNumber] as HTMLSpanElement).style.height =
          height + 'px';
      });
    });
  }

  /**
   * Returns style declarations for the element
   *
   * @param {Element} element
   */
  function getStyles(element: Element) {
    if (!element) {
      return null;
    }

    return getComputedStyle(element);
  }

  let lastWidth: number | undefined = undefined;
  window.addEventListener('resize', function () {
    if (config.assumeViewportIndependence && lastWidth === window.innerWidth) {
      return;
    }
    lastWidth = window.innerWidth;

    resizeElements(
      Array.prototype.slice.call(
        document.querySelectorAll('pre.' + PLUGIN_NAME)
      )
    );
  });

  Prism.hooks.add('complete', function (env) {
    if (!env.code) {
      return;
    }

    const code = /** @type {Element} */ env.element;
    const pre = /** @type {HTMLElement} */ code.parentNode as HTMLPreElement;

    // works only for <code> wrapped inside <pre> (not inline)
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }

    // Abort if line numbers already exists
    if (code.querySelector('.line-numbers-rows')) {
      return;
    }

    // only add line numbers if <code> or one of its ancestors has the `line-numbers` class
    if (!(Prism.util as any).isActive(code, PLUGIN_NAME)) {
      return;
    }

    // Remove the class 'line-numbers' from the <code>
    code.classList.remove(PLUGIN_NAME);
    // Add the class 'line-numbers' to the <pre>
    pre.classList.add(PLUGIN_NAME);

    const match = env.code.match(NEW_LINE_EXP);
    const linesNum = match ? match.length + 1 : 1;

    const lines = new Array(linesNum + 1).join('<span></span>');

    const lineNumbersWrapper = document.createElement('span');
    lineNumbersWrapper.setAttribute('aria-hidden', 'true');
    lineNumbersWrapper.className = 'line-numbers-rows';
    lineNumbersWrapper.innerHTML = lines;

    if (pre.hasAttribute('data-start')) {
      pre.style.counterReset =
        'linenumber ' + (parseInt(pre.getAttribute('data-start')!, 10) - 1);
    }

    env.element.parentElement!.appendChild(lineNumbersWrapper);

    resizeElements([pre]);

    Prism.hooks.run('line-numbers', env);
  });

  Prism.hooks.add('line-numbers', function (env) {
    env.plugins = env.plugins || {};
    env.plugins.lineNumbers = true;
  });
}
