import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Buses } from './Buses';
import { Ticket } from './Ticket';
import { Done } from './Done';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='ListBuses' component={Buses} />
            <Stack.Screen name='Ticket' component={Ticket} />
            <Stack.Screen name='Done' component={Done} />
        </Stack.Navigator>
    </NavigationContainer>
}