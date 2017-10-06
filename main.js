import Expo,{Font} from 'expo';
import React from 'react';
import Tasklist from './components/TaskList';
import { StyleSheet, Text, View } from 'react-native';

class App extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
            'Roboto-LightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),

        });
        this.setState({fontLoaded: true});

    }

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
        }
    }

    render() {
    return (this.state.fontLoaded ?
            <View style={styles.container}>
          <Tasklist/>
      </View>:null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171c32',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
