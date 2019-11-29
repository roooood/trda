import React from 'react';
import Toolbar from '../Toolbar';
import Context from 'library/Context';

import './ConversationList.css';

class ConversationList extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="conversation-list">
        <Toolbar
          title="User List"
        />
        <div className="conversation-search">
          <input
            type="search"
            className="conversation-search-input"
            placeholder="Search Messages"
          />
        </div>
        {
          Object.keys(this.props.list).map(key =>
            <div className={"conversation-list-item " + (this.props.selected == key ? 'active' : '')} onClick={() => this.props.user(key)} key={key}>
              <div className="conversation-info">
                <h1 className="conversation-title">{this.props.list[key].user.username}</h1>
                <p className="conversation-snippet">{this.props.list[key].text}</p>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default ConversationList;
