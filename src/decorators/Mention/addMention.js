import { EditorState, Modifier } from "draft-js";
import { getSelectedBlock } from "draftjs-utils";

export default function addMention(
  editorState,
  onChange,
  separator,
  trigger,
  suggestion
) {
  const { value, url, text } = suggestion;

  const TEXT = text;

  const entityKey = editorState
    .getCurrentContent()
    .createEntity("MENTION", "IMMUTABLE", {
      text: `${trigger}${TEXT}`,
      value,
      url,
    })
    .getLastCreatedEntityKey();
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  let focusOffset = editorState.getSelection().focusOffset;
  const mentionIndex =
    (selectedBlockText.lastIndexOf(separator + trigger, focusOffset) || 0) + 1;
  let spaceAlreadyPresent = false;
  if (selectedBlockText.length === mentionIndex + 1) {
    focusOffset = selectedBlockText.length;
  }
  if (selectedBlockText[focusOffset] === " ") {
    spaceAlreadyPresent = true;
  }
  let updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex,
    focusOffset,
  });
  let newEditorState = EditorState.acceptSelection(
    editorState,
    updatedSelection
  );
  let contentState = Modifier.replaceText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    `${trigger}${TEXT}`,
    newEditorState.getCurrentInlineStyle(),
    entityKey
  );
  newEditorState = EditorState.push(
    newEditorState,
    contentState,
    "insert-characters"
  );

  if (!spaceAlreadyPresent) {
    // insert a blank space after mention
    updatedSelection = newEditorState.getSelection().merge({
      anchorOffset: mentionIndex + TEXT.length + trigger.length,
      focusOffset: mentionIndex + TEXT.length + trigger.length,
    });
    newEditorState = EditorState.acceptSelection(
      newEditorState,
      updatedSelection
    );
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      updatedSelection,
      " ",
      newEditorState.getCurrentInlineStyle(),
      undefined
    );
  }
  onChange(EditorState.push(newEditorState, contentState, "insert-characters"));
}
