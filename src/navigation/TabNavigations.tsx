import React, { useMemo } from 'react'
import { Text, useColorScheme } from 'react-native'
import TaskProvider from '../store/TaskProvider'
import {NavigationContainer, Theme, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from '../pages/MainPage';
import AddTodos from '../pages/AddTodos';
import CalenderPage from '../pages/CalenderPage';

const Tab = createBottomTabNavigator();

const TabNavigations = () => {
    const colorScheme = useColorScheme();
    const theme:Theme = useMemo(
      ()=>{
        const themes = colorScheme === "dark" ? DarkTheme : DefaultTheme
        colorScheme === "dark" ? themes.colors.card ="#93B1A6" : themes.colors.card="#7743DB"
        colorScheme === "dark" ? themes.colors.background ="#040D12" : themes.colors.background="#FFFBF5"
        colorScheme === "dark" ? themes.colors.text ="#FFFBF5" : themes.colors.text="#040D12"
        colorScheme === "dark" ? themes.colors.primary ="#183D3D" : themes.colors.primary="#F7EFE5"
        colorScheme === "dark" ? themes.colors.border ="#5C8374" : themes.colors.border="#C3ACD0"
        colorScheme === "dark" ? themes.colors.notification = "#183D3D": themes.colors.notification = "#7743DB"
        return themes;
      },
      [colorScheme]
    );
    return (
        <TaskProvider>
            <NavigationContainer independent={true}  theme={theme}>
                <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: theme.colors.text, tabBarInactiveTintColor: 'gray', tabBarActiveBackgroundColor: theme.colors.notification, tabBarInactiveBackgroundColor: theme.colors.notification}} initialRouteName='Home'>
                    <Tab.Screen name="Add Todo" component={AddTodos} />
                    <Tab.Screen name="Home" component={MainPage} />    
                    <Tab.Screen name="Calender" component={CalenderPage} />
                </Tab.Navigator>
            </NavigationContainer>
        </TaskProvider>
    )
}

export default TabNavigations