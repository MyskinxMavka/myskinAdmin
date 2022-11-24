// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import {Editor} from "react-draft-wysiwyg";
import {EditorState,} from 'draft-js';
import {EditorWrapper} from './styled'
import React from 'react'
import {convertToHTML} from 'draft-convert'
import {stateFromHTML} from 'draft-js-import-html';

const convertEmptyBlockLoad = function(html){
  return html.replace(/<[^/>][^>]*><\/[^>]+>/g, "<p><br/></p>");
}

const convertEmptyBlockSave = function(html){
  const emptyTag = '<p></p>'
  const emptyTagWithBR = '<p><br/></p>'
 
  if (html == emptyTag || html == emptyTagWithBR) {
    return ''
  } else {
    return html.replace(/<[^/>][^>]*><\/[^>]+>/g, "<p></p>");
  }
}

const TextArea = ({value, onChange}) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  
  React.useEffect(()=> { 
    if (!value) return 
    try {
      const initial = EditorState.createWithContent(
        stateFromHTML(convertEmptyBlockLoad(value))
      )
      setEditorState(initial)
    } catch (error) {
      setEditorState(value)
    }
    
  },[value])
    
  const handleEditorChange = (state) => {
    setEditorState(state);
    sendContent();
  };

  const sendContent = () => {
    onChange(convertEmptyBlockSave(convertToHTML(editorState?.getCurrentContent())));
  };
      
  return (
    <EditorWrapper>
        <Editor 
            toolbar={{
              options: ['inline', 'list'],
              inline: { inDropdown: false, options: ['bold', 'underline']},
              list: { inDropdown: false,},
            }}
            onEditorStateChange={handleEditorChange}
            editorState={editorState}
        />
    </EditorWrapper>
  )
}

export default TextArea
