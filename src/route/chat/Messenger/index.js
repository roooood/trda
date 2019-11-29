import React from 'react';
import autoBind from 'react-autobind';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import Context from 'library/Context';
import './Messenger.css';

class Messenger extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      selected: null,
      messages: {}
    };
    autoBind(this)
  }
  componentDidMount() {
    this.context.game.register('message', this.messages);
    this.context.game.send({ get: 'Messages' });
  }
  user(selected) {
    this.setState({ selected })
  }
  newMessage(newMessage) {
    if (this.state.selected == null)
      return;
    this.context.game.send({ message: [this.state.selected, newMessage] });
  }
  messages(messages) {
    let msg;
    for (msg of messages) {
      this.state.list[msg.user_id] = msg;
      if (!(msg.user_id in this.state.messages)) {
        this.state.messages[msg.user_id] = [];
      }
      this.state.messages[msg.user_id].push(msg)
    }
    this.forceUpdate();
  }
  render() {
    const { list, messages, selected } = this.state;
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList list={list} user={this.user} selected={this.state.selected} />
        </div>

        <div className="scrollable content">
          <MessageList messages={selected ? messages[selected] : []} newMessage={this.newMessage} />
        </div>
      </div>
    );
  }
}

export default Messenger;
