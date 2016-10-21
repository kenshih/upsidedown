var APP_ID='1215731745163457';

var ADD_MEETUP_USER_TO_GROUP='Add Meetup User to Group';
var ADD_FB_USER_TO_GROUP='Add FB User to Group';
var SEND_INVITE ='Send an Invite';
var INVITE_SENT = 'Invite Sent';
var ADDED = 'Added';

//the following don't work
//var BTN_MUP = (<StateChangeButton initText={ADD_MEETUP_USER_TO_GROUP} updateName={ADDED} />);

function getMemberComponent(name) {
  var classNames = {
    'Shih'  : (<div className="member-list-item">
                <div className="cell">Ken Shih</div>
                <div className="cell"><StateChangeButton initText={ADD_MEETUP_USER_TO_GROUP} updateName={ADDED} /></div>
               </div>),
    'Linh'  : (<div className="member-list-item">
                <div className="cell">Bùi Phương Linh</div>
                <div className="cell"><StateChangeButton initText={SEND_INVITE} updateName={INVITE_SENT} /></div>
               </div>),
    'Lee'   : (<div className="member-list-item">
                  <div className="cell">Sak Lee has a FB account associated with Meetup</div>
                  <div className="cell"><StateChangeButton initText={ADD_FB_USER_TO_GROUP} updateName={ADDED} /></div>
               </div>),
    'Spencer': (<div className="member-list-item">
                  <div className="cell">
                    Mike Spencer
                  </div>
                  <div className="cell">
                    <div className="table">
                      <span className="found">Found these Meetup users matching "Mike Spencer"</span>
                      <div className="row">
                        <div className="cell">Mike Spencer at New York, NY</div>
                        <div className="cell"><StateChangeButton initText={ADD_MEETUP_USER_TO_GROUP} updateName={ADDED} /></div>
                      </div>
                      <div className="row">
                        <div className="cell">Spencer at Cincinnati, OH</div>
                        <div><StateChangeButton initText={ADD_MEETUP_USER_TO_GROUP} updateName={ADDED} /></div>
                      </div>
                    </div>
                  </div>
                </div>
                ),
    'default' : (<span>
                 John Doe was not found on Meetup
                 <StateChangeButton initText={SEND_INVITE} updateName={INVITE_SENT} />
                </span>)
  };
  return (classNames[name] || classNames['default']);
}

var StateChangeButton = React.createClass({
  getInitialState: function() {
    return { clicked: false };
  },

  clicked: function() {
    this.setState({ clicked: true });
  },

  render: function() {
    var self = this;
    var btnState = "hi";
    if(self.state.clicked) {
      btnState = self.props.updateName;
    } else {
      btnState = self.props.initText;
    }
    return (
      <button onClick={self.clicked}>{btnState}</button>
    );
  },
});

//a member is nested
var Member = React.createClass({
  render: function() {
    var memberFound =  getMemberComponent(this.props.member.last_name);
    var debug = (<span className="debug">{this.props.member.first_name} {this.props.member.last_name} {this.props.member.id}</span>);
    return memberFound;
  },
});

// entrypoint into react - the top-level component
var Page = React.createClass({
  getInitialState: function() {
    return {members: []};
  },
  componentDidMount: function() {
   var self = this;
   FB.api(
     '/1786434821641314',
     'GET',
     {"fields":"members{email,first_name,last_name,middle_name,about}"},
     function(response) {
       console.log('callback from FB get');
       var membersData = response.members.data.map(
         function(x){ return x; }
       );
       console.log(membersData);
       self.setState({members: membersData});
   });
 },
  render: function() {
    console.log('state at render time');
    console.log(this.state);
    return (
        <div className="page">
          <div className="list-container">
            <div className="member-list">
            {
              this.state.members.map(function(member) {
                return <Member key={member.id} member={member} />;
              })
            }
            </div>
          </div>
        </div>
    );
  }
});

// React bootstrap interface
function bootstrapReact(authKey) {
  ReactDOM.render(
    <Page authKey={authKey} />,
    document.getElementById('content')
  );
}
function initButton() {
  var button = document.getElementById("crassButton");
  button.onclick = checkLoginState;
}

// FB integration code that bootstraps react
window.fbAsyncInit = function() {
  FB.init({
    appId: APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v2.5',
  });
  initButton();
};
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
var checkLoginState = function () {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};
var statusChangeCallback = function (response) {
  //console.log(response);
  if (response.status === 'connected') {
     bootstrapReact(response.authResponse.accessToken)
   }
};
