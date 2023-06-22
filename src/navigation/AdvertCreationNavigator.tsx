import {createNativeStackNavigator,} from "@react-navigation/native-stack";
import AdvertDataScreen from "../screens/AdvertDataScreen";
import {Routes} from "./Route";
import {useEffect, useState} from "react";
import CreateAdvertContext, {AdvertPropsType,} from "../context/CreateAdvertContext";
import AdvertConfirmation from "../screens/AdvertConfirmation";
import CustomHeader from "../components/CustomHeader";
import AdvertLocalisationScreen from "../screens/AdvertLocalisationScreen";
import {LatLng} from "react-native-maps";
import {useApi} from "../hooks/UseApi";
import {AxiosError} from "axios";
import {useAuthentication} from "../context/Authentication";
import {showMessage} from "react-native-flash-message";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();

const AdvertCreationNavigator = ({
  navigation,
  route,
}: BottomTabScreenProps<any>) => {
  const api = useApi();
  const { user } = useAuthentication();
  const defaultAdvert: AdvertPropsType = {
    // @ts-ignore
    userId: user.id,
    animalName: "",
    animalType: "",
    animalBreed: "",
    animalAge: "",
    animalSex: "",
    description: "",
    city: "",
    longitude: 0,
    latitude: 0,
    radius: 50,
    images: [],
    isPremium: false,
    isGoogleAds: false,
  };

  const [advert, setAdvert] = useState<AdvertPropsType>(defaultAdvert);

  useEffect(() => {
    console.log(advert.latitude, advert.longitude, advert.city);
  }, [advert])

  const updateAdvertField = (field: string, value: any) => {
    setAdvert({ ...advert, [field]: value });
  };

  const updateAdvertLocation = (markerCoords: LatLng, city: string) => {
    setAdvert({
      ...advert,
      latitude: markerCoords.latitude,
      longitude: markerCoords.longitude,
      city
    });
  };

  const createAdvert = async () => {
    await api
      .post("/adverts", formatData())
      .then((res) => {
        if (res.status === 200) {
          setAdvert(defaultAdvert);
          navigation.navigate(Routes.ADVERT_CONFIRMATION);
        } else {
          showMessage({
            type: "danger",
            message: "Il y a une erreur pendant la création de votre annonce",
          });
        }
      })
      .catch((e: AxiosError) => {
        console.log(e.response);
        showMessage({
          type: "danger",
          message: "Il y a une erreur pendant la création de votre annonce",
        });
      });
  };

  const formatData = () => {
    const data = {};
    Object.keys(advert).forEach((key) => {
      if (key !== "images") {
        // @ts-ignore
        data[camelToSnake(key)] = advert[key];
      } else {
        // @ts-ignore
        data["images"] = advert.images.map((picture: any) => picture.base64);
      }
    });
    return data;
  };

  function camelToSnake(camelString: string) {
    return camelString.replace(/([A-Z])/g, "_$1").toLowerCase();
  }

  return (
    <CreateAdvertContext.Provider
      value={{ advert, updateAdvertField, updateAdvertLocation, createAdvert }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          header: (props) => (
            <CustomHeader
              {...props}
              backgroundColor={"white"}
              textColor={"#1B404E"}
            />
          ),
        }}
        initialRouteName={Routes.ADVERT_DATA_SCREEN}
      >
        <Stack.Screen
          name={Routes.ADVERT_DATA_SCREEN}
          component={AdvertDataScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={Routes.ADVERT_LOCALISATION}
          component={AdvertLocalisationScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={Routes.ADVERT_CONFIRMATION}
          component={AdvertConfirmation}
          options={{ headerShown: true, headerTitle: "" }}
        />
      </Stack.Navigator>
    </CreateAdvertContext.Provider>
  );
};

export default AdvertCreationNavigator;
