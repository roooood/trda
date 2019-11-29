import React from 'react';
import Toolbar from '../Toolbar';
import Message from '../Message';
import moment from 'moment';
import './MessageList.css';
import { t } from 'locales';
import autoBind from 'react-autobind';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  renderMessages() {
    const { messages } = this.props;
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.status == 'to';
      let currentMoment = moment(current.time);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.time);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.status === current.status;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.time);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.status === current.status;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }
  handleSubmit(e) {
    e.preventDefault()
    const { newMessage } = this.state;
    if (newMessage) {
      this.props.newMessage(newMessage);
    }
    this.setState({ newMessage: '' })
  }

  handleInputChange(e) {
    this.setState({
      newMessage: e.target.value,
    })
  }
  render() {
    return (
      <div className="message-list">
        <Toolbar
          title="Conversation Title"
        />
        <div className="message-list-container">{this.renderMessages()}</div>
        <div className="compose">
          <form onSubmit={this.handleSubmit}>
            <input
              value={this.state.newMessage}
              type="text"
              className="compose-input"
              placeholder={t('type')}
              onChange={this.handleInputChange}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;