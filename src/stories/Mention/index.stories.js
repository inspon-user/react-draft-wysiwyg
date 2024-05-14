/* @flow */

import React from "react";
import { Editor } from "../..";

import "../styles.css";

/**
 * Default trigger is '@' and default separator between words is ' '.
 * thus there fields are optional.
 */
const MentionComponent = () => (
  <div className="rdw-storybook-root">
    <span>Type @ to see suggestions</span>
    <Editor
      mention={{
        separator: " ",
        trigger: "@",
        suggestions: [
          { text: "APPLE", value: "apple", url: "https://google.com", id: 1 },
          { text: "BANANA", value: "banana", url: "banana", id: 2 },
          { text: "CHERRY", value: "cherry", url: "cherry", id: 3 },
          { text: "DURIAN", value: "durian", url: "durian", id: 4 },
          { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit", id: 5 },
          { text: "FIG", value: "fig", url: "fig", id: 6 },
          { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit", id: 7 },
          { text: "HONEYDEW", value: "honeydew", url: "honeydew", id: 8 },
        ],
      }}
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
    />
  </div>
);

export default {
  title: "Editor",
  component: MentionComponent,
};

export const Mention = {
  args: {},
};
