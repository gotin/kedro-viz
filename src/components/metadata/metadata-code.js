import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import yaml from 'highlight.js/lib/languages/yaml';
import modifiers from '../../utils/modifiers';
import './styles/metadata-code.css';

hljs.registerLanguage('python', python);
hljs.registerLanguage('yaml', yaml);

/**
 * A highlighted code panel
 */
export const MetaDataCode = ({
  visible = true,
  value = '',
  sidebarVisible
}) => {
  const codeRef = useRef();
  const [highlighted, setHighlighted] = useState();

  useEffect(() => {
    const detected = hljs.highlightAuto(value);
    const language = detected.language || detected.second_best.language;
    setHighlighted(hljs.highlight(language, value).value);
  }, [codeRef, value]);

  return (
    <div
      className={modifiers(
        'pipeline-metadata-code',
        { visible, sidebarVisible },
        'kedro'
      )}>
      <h2 className="pipeline-metadata-code__title">Code block</h2>
      <code className="pipeline-metadata-code__code">
        <pre ref={codeRef} dangerouslySetInnerHTML={{ __html: highlighted }} />
      </code>
    </div>
  );
};

const mapStateToProps = state => ({
  sidebarVisible: state.visible.sidebar
});

export default connect(mapStateToProps)(MetaDataCode);