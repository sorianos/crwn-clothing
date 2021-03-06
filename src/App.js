import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignOutComponent from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileComponent } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {

  unsuscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsuscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileComponent(userAuth);

        userRef.onSnapshot( snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } 
        
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route 
            exact 
            path='/signin' 
            render={
              () => this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignOutComponent />
              )} 
            />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps =({user}) => ({
  currentUser: user.currentUser
});


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
