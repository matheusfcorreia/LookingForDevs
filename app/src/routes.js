import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Radar'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Users Github'
      }
    },
  }, { 
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#595959'
      }
    }
  })
)

export default Routes;
