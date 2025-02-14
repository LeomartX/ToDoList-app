import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createStaticNavigation,
    StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import completedIcon from '../assets/completedIcon.png';
import pendingIcon from '../assets/pendingIcon.png';
import { PendingTasks } from './screens/PendingTasks';
import { CompletedTasks } from './screens/CompletedTasks';

const HomeTabs = createBottomTabNavigator({
    screens: {
        Home: {
            screen: PendingTasks,
            options: {
                title: 'Tareas Pendientes',
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={pendingIcon}
                        tintColor={color}
                        style={{
                            width: size,
                            height: size,
                        }}
                    />
                ),
            },
        },
        Updates: {
            screen: CompletedTasks,
            options: {
                title: 'Tareas Completadas',
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={completedIcon}
                        tintColor={color}
                        style={{
                            width: size,
                            height: size,
                        }}
                    />
                ),
            },
        },
    },
});

const RootStack = createNativeStackNavigator({
    screens: {
        HomeTabs: {
            screen: HomeTabs,
            options: {
                title: 'Home',
                headerShown: false,
            },
        },
    },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}