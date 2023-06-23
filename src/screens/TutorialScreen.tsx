import { Button, ViewPager } from "@ui-kitten/components";
import { useState } from "react";
import TutorialTab from "../components/TutorialTab";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { View, StatusBar as RNStatusBar } from "react-native";
import { save } from "../utils/SecureStore";
import PatPerdueButton from "../components/PatPerdueButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "../navigation/Route";

const tutorialTabs = [
  {
    title: "Retrouvez le sourire !",
    description:
      "Profitez de l’application qui va mettre tout en oeuvre pour retrouver vos amis",
  },
  {
    title: "Une annonce synchronisée",
    description:
      "Créez votre annonce en 3min Profitez de notre audience et de notre communauté présente partout !",
  },
  {
    title: "La zone de recherche",
    description:
      "Déterminez votre zone de recherche. Les utilisateurs présents vont recevoir une alerte pour vous aider.",
  },
  {
    title: "Sauvez un animal\nC'est un souvenir à vie",
    description:
      "Rejoignez la communauté pour avoir la possibilité de redonner le sourire à quelqu’un.",
  },
];

const TutorialScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTutorialEnd = async () => {
    // await save('tutorialDone', 'true');
    navigation.navigate(Routes.LOGIN_SCREEN);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: RNStatusBar.currentHeight,
        backgroundColor: "rgb(250,231,211)",
      }}
    >
      <StatusBar backgroundColor={"#EFD2B2"} />
      <Image
        source={require("../../assets/patperdue_small_logo.png")}
        style={{
          width: 60,
          height: 50,
          alignSelf: "center",
          marginVertical: 20,
        }}
        contentFit={"contain"}
      />
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        style={{ height: "70%" }}
      >
        {tutorialTabs.map((tab, index) => (
          <TutorialTab
            key={index}
            title={tab.title}
            description={tab.description}
          />
        ))}
      </ViewPager>
      <PagerDots selectedIndex={selectedIndex} />
      <PatPerdueButton
        title={"S'inscrire gratuitement"}
        onPress={handleTutorialEnd}
        backgroundColor={"#ef9a3f"}
      />
    </View>
  );
};

const PagerDots = ({ selectedIndex }: { selectedIndex: number }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      {tutorialTabs.map((tab, index) => (
        <View
          key={index}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor:
              index === selectedIndex ? "black" : "rgba(0,0,0,0.2)",
            marginHorizontal: 5,
          }}
        />
      ))}
    </View>
  );
};

export default TutorialScreen;
