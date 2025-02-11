import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

import LibraryView from "./LibraryView";
import NewBookView from "./NewBookView";
import ChartsView from "./ChartsView";

import BookDetailsView from "./BookDetailsView";
import { LibraryProvider } from "../Controllers/LibraryContext";

const Tab = createBottomTabNavigator();

const LibraryStack = createStackNavigator<RootStackParamList>();

const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="LibraryView"
        component={LibraryView}
        options={{ headerShown: false, title: "Library" }}
      />
      <LibraryStack.Screen
        name="BookDetails"
        component={BookDetailsView}
        options={{ title: "Book Details" }}
      />
    </LibraryStack.Navigator>
  );
};

const AppView: React.FC = () => {
  return (
    <LibraryProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: string = "";
              if (route.name === "Library") {
                iconName = "library-sharp";
              } else if (route.name === "New Book") {
                iconName = "book-outline";
              } else if (route.name === "Charts") {
                iconName = "bar-chart";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Library"
            component={LibraryStackScreen}
            options={{
              tabBarLabel: "Library",
            }}
          />
          <Tab.Screen
            name="New Book"
            component={NewBookView}
            options={{
              tabBarLabel: "New Book",
            }}
          />
          <Tab.Screen
            name="Charts"
            component={ChartsView}
            options={{
              tabBarLabel: "Charts",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </LibraryProvider>
  );
};

export default AppView;
