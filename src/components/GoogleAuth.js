import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {


  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '885123172135-6otbtt15qmtvfp3nllm6u8ml36ubuvev.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        //Setup listener for auth changes!!!
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    //Triggers onAuthChange thanks to .listen call in componentDidMount
    this.auth.signIn();
  }

  onSignOutClick = () => {
    //Triggers onAuthChange thanks to .listen call in componentDidMount
    this.auth.signOut();
  }

  renderAuthButton(){
    if(this.props.isSignedIn === null){
      return null;
    }

    if(this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon'/>Sign out
        </button>
      );
    }

    return (
      <button onClick={this.onSignInClick} className='ui green google button'>
        <i className='google icon'/>Sign in with Google
      </button>
    );
  }

  render(){
    return(
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
