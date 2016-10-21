var APP_ID='1215731745163457';

var Member = React.createClass({
  render: function() {
    return (
      <div className="member">
        {this.props.member.first_name} {this.props.member.last_name} {this.props.member.id}
      </div>
    );
  },
});

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
          {
            this.state.members.map(function(member) {
              return <Member key={member.id} member={member} />;
            })
          }
        </div>
    );
  }
});

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
window.fbAsyncInit = function() {
  FB.init({
    appId: APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v2.5',
  });
  initButton();
  //x();

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

  var getMembersCallback = function (response) {
    console.log("get members api output follows");
    console.log(response)
  };

  var statusChangeCallback = function (response) {
    console.log(response);
    if (response.status === 'connected') {
       bootstrapReact(response.authResponse.accessToken)
      //  FB.api(
      //    '/1786434821641314',
      //    'GET',
      //    {"fields":"members{email,first_name,last_name,middle_name,about}"},
      //    getMembersCallback
      //  );
     }
  };
