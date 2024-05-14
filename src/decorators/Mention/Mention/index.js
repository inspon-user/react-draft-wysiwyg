import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

class Mention {
  constructor(className) {
    this.className = className;
  }
  getMentionComponent = () => {
    const className = this.className;

    const MentionComponent = (props) => {
      const { entityKey, children, contentState } = props;
      const { url, value } = contentState.getEntity(entityKey).getData();

      return (
        <span
          data-submission-id="123"
          className={classNames("rdw-mention-link", className)}
        >
          {children}
        </span>
      );
    };

    MentionComponent.propTypes = {
      entityKey: PropTypes.number,
      children: PropTypes.array,
      contentState: PropTypes.object,
    };

    return MentionComponent;
  };

  getMentionDecorator = () => ({
    strategy: this.findMentionEntities,
    component: this.getMentionComponent(),
  });
}

Mention.prototype.findMentionEntities = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "MENTION"
    );
  }, callback);
};

export default Mention;
