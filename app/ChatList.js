var React = require('react');
var $ = require('jquery');

var ChatList = React.createClass({
    getInitialState: function() {
        return {
            chats: []
        }
    },

    propTypes: {
        url: React.PropTypes.string.isRequired
    },
    getDefaultProps: function() {
        return {
            url: 'https://api.parse.com/1/classes/chat'
        };
    },

    getChats: function() {
        $.ajax({
            url: this.props.url,
            type: 'GET',
            beforeSend: function(request) {
                request.setRequestHeader("X-Parse-Application-Id", 'MhS4V9SjZJvVYBeldGZW6wuPU6PjtDUcnqZxJfPI');
                request.setRequestHeader("X-Parse-REST-API-Key", 'n3S4L8uPLmXttZD3VjGxM4yW3T8cinNjzt1yyxNl');
                request.setRequestHeader("Content-Type", 'application/json');
            },
            error: function(data) {
                console.log('There was an error in getting the chats');
            },
            success: function(data) {
                if (this.isMounted()) { // refers to mounting on the DOM
                    this.setState({                        
                        chats: data.results
                    });
                }
            }.bind(this)
        })
    },
    componentDidMount: function() {
        this.interval = setInterval(function() {
            this.getChats();
        }.bind(this), 1000)
    },
    componentWillUnmount: function() { // need to unmount to stop ajax request
        clearInterval(this.interval);
    },

    render: function() {
        var newChatsMapResults = this.state.chats.map(function(item, index) { 
            return <li className = "list-group-item" key = {item.objectId}> {item.text} < /li>
        });

        return ( 
        	< ul className = "list-group" >
        		{newChatsMapResults}
            < /ul>

        )
    }
});

module.exports = ChatList;
