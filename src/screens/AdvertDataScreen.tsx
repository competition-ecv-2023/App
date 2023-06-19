import ScreenContainer from "../components/ScreenContainer";
import {Input, Layout, Text} from "@ui-kitten/components";
import {default as animalsTypes} from "../../assets/animals.json";
import {ReactElement, useCallback, useState} from "react";
import {FlatListProps, ListRenderItem, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
import Autocomplete from 'react-native-autocomplete-input';

const filter = (item: {
    animalType: string
}, query: string): boolean => item.animalType.toLowerCase().includes(query.toLowerCase());

const AdvertDataScreen = () => {

    const [animals, setAnimals] = useState<{ animalType: string }[]>([]);
    const [animalType, setAnimalType] = useState<string | undefined>(undefined);
    const [animalName, setAnimalName] = useState<string | undefined>(undefined);
    const [disappearingAddress, setDisappearingAddress] = useState<string | undefined>(undefined);
    const [pictures, setPictures] = useState<string[]>([]);
    const [identificationNumber, setIdentificationNumber] = useState<string | undefined>(undefined);
    const [moreInfos, setMoreInfos] = useState<string | undefined>(undefined);

    const onChangeText = useCallback((query: string): void => {
        if (query.length > 0) {
            setAnimalType(query);
            setAnimals(animalsTypes.filter(item => filter(item, query)));
        } else {
            setAnimalType(query);
            setAnimals([]);
        }
    }, []);

    const renderOption = useCallback(({item}: any): ReactElement => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setAnimalType(item.animalType);
                    setAnimals([]);
                }}
                style={{padding: 10}}
            >
                <Text style={{color: 'black'}}>{item.animalType}</Text>
            </TouchableOpacity>
        )
    }, []);

    return (
        <ScreenContainer withScroll>
            <Layout style={styles.container}>
                <Autocomplete
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    onChangeText={onChangeText}
                    data={animals}
                    value={animalType}
                    placeholder={"Quel est le type d'animal ?"}
                    style={{backgroundColor: '#f1f1f1', borderRadius: 5, borderWidth: 0}}
                    inputContainerStyle={{borderWidth: 0}}
                    containerStyle={{maxHeight: animals.length > 0 ? 340 : 40}}
                    listContainerStyle={{height: 300}}
                    flatListProps={{
                        style: {borderWidth: 0, backgroundColor: '#e4e4e4'},
                        keyExtractor: (item, idx) => "" + idx,
                        renderItem: renderOption
                    }}
                />
                <Input
                    placeholder={"Son prénom"}
                    style={styles.input}
                    value={animalName}
                    onChangeText={(value) => setAnimalName(value)}
                />
                <Input
                    placeholder={"Adresse de la disparition"}
                    style={styles.input}
                    value={disappearingAddress}
                    onChangeText={(value) => setDisappearingAddress(value)}
                />
                {/*<Input*/}
                {/*    placeholder={"Ajouter des photos de lui/elle"}*/}
                {/*    style={styles.input}*/}
                {/*    value={pictures}*/}
                {/*    onChangeText={(value) => setPictures([])}*/}
                {/*/>*/}
                <Input
                    placeholder={"Numéro d'identification"}
                    style={styles.input}
                    value={identificationNumber}
                    onChangeText={(value) => setIdentificationNumber(value)}
                />
                <Input
                    placeholder={"Une particularité physique ?"}
                    style={styles.input}
                    value={moreInfos}
                    onChangeText={(value) => setMoreInfos(value)}
                />
            </Layout>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        padding: 10
    },
    input: {
        backgroundColor: '#f1f1f1',
        marginVertical: 10,
        color: 'black'
    }
})

export default AdvertDataScreen;
