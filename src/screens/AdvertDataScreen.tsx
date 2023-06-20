import ScreenContainer from "../components/ScreenContainer";
import {Icon, Input, Layout, Text} from "@ui-kitten/components";
import {default as animalsTypes} from "../../assets/animals.json";
import React, {ReactElement, useContext, useState} from "react";
import {FlatList, StatusBar, StyleSheet, TouchableOpacity, View} from "react-native";
import Autocomplete from 'react-native-autocomplete-input';
import CreateAdvertContext from "../context/CreateAdvertContext";
import * as ImagePicker from 'expo-image-picker';
import {useApi} from "../hooks/UseApi";
import OutlineButton from "../components/OutlineButton";
import {Routes} from "../navigation/Route";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Image} from "expo-image";

const filter = (item: {
    animalType: string
}, query: string): boolean => item.animalType.toLowerCase().includes(query.toLowerCase());

const InfoIcon = (props: any): React.ReactElement => (
    <Icon {...props} name={"info"}/>
);

const AdvertDataScreen = ({navigation}: NativeStackScreenProps<any>) => {

    const [animals, setAnimals] = useState<{ animalType: string }[]>([]);

    const {advert, updateAdvertField} = useContext(CreateAdvertContext);

    const api = useApi()

    const onChangeText = (query: string): void => {
        if (query.length > 0) {
            updateAdvertField("animalType", query);
            setAnimals(animalsTypes.filter(item => filter(item, query)));
        } else {
            updateAdvertField("animalType", query);
            setAnimals([]);
        }
    };

    const renderOption = ({item}: any): ReactElement => {
        return (
            <TouchableOpacity
                onPress={() => {
                    updateAdvertField("animalType", item.animalType);
                    setAnimals([]);
                }}
                style={{padding: 10}}
            >
                <Text style={{color: 'black'}}>{item.animalType}</Text>
            </TouchableOpacity>
        )
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: true,
            selectionLimit: 4
        });
        updateAdvertField("images", result.assets);
    }

    const deleteImage = (image: any) => {
        const oldImages = advert.images;
        // @ts-ignore
        const newImages = oldImages.filter((img) => img.uri !== image.uri);
        updateAdvertField("images", newImages);
    }

    return (
        <ScreenContainer withScroll>
            <Layout style={styles.container}>
                <Autocomplete
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    onChangeText={onChangeText}
                    data={animals}
                    value={advert.animalType}
                    placeholder={"Quel est le type d'animal ?"}
                    style={{backgroundColor: '#f1f1f1', borderRadius: 5, borderWidth: 0,}}
                    inputContainerStyle={{borderWidth: 0}}
                    containerStyle={{
                        height: animals.length > 0 ? animals.length * 55 < 340 ? animals.length * 55 : 340 : 40,
                        marginVertical: 10,
                    }}
                    listContainerStyle={{height: animals.length > 0 ? animals.length * 55 < 340 ? animals.length * 40 : 300 : 40,}}
                    flatListProps={{
                        style: {borderWidth: 0, backgroundColor: '#e4e4e4'},
                        keyExtractor: (item, idx) => "" + idx,
                        nestedScrollEnabled: true,
                        renderItem: renderOption
                    }}
                />
                <Input
                    placeholder={"Son prénom"}
                    style={styles.input}
                    textStyle={styles.inputText}
                    value={advert.animalName}
                    onChangeText={(value) => updateAdvertField("animalName", value)}
                    size={"large"}
                />
                <Input
                    placeholder={"Ville de la disparition"}
                    style={styles.input}
                    textStyle={styles.inputText}
                    value={advert.city}
                    onChangeText={(value) => updateAdvertField("city", value)}
                    size={"large"}
                />
                <TouchableOpacity
                    style={{
                        ...styles.input,
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                    onPress={pickImage}
                >
                    <Text style={{color: '#848484'}}>Ajouter des photos de votre animal</Text>
                    <Text style={{color: '#848484'}}>{advert.images.length} / 4</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {advert.images.map((image, idx) => renderImage(image, idx, deleteImage))}
                </View>
                <Input
                    placeholder={"Numéro d'identification"}
                    style={styles.input}
                    textStyle={styles.inputText}
                    value={advert.identificationNumber}
                    onChangeText={(value) => updateAdvertField("identificationNumber", value)}
                    size={"large"}
                    accessoryRight={InfoIcon}
                />
                <Input
                    placeholder={"Une particularité physique ?"}
                    style={styles.input}
                    textStyle={styles.inputText}
                    value={advert.description}
                    onChangeText={(value) => updateAdvertField("description", value)}
                    size={"large"}
                />
                <OutlineButton title={"Suivant"} onPress={() => navigation.navigate(Routes.ADVERT_LOCALISATION)}/>
            </Layout>
        </ScreenContainer>
    )
}

const renderImage = (image: any, idx: number, deleteImage: (image: any) => void) => {
    return (
        <TouchableOpacity
            key={idx}
            style={{width: '50%', height: 100, padding: 2}}
            activeOpacity={0.6}
            onPress={() => deleteImage(image)}
        >
            <Image
                source={{uri: image.uri}}
                style={{width: '100%', height: '100%'}}
                contentPosition={"top center"}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        padding: 10
    },
    input: {
        backgroundColor: '#f1f1f1',
        marginVertical: 10,
    },
    inputText: {
        color: 'black'
    }
})

export default AdvertDataScreen;
