import {Card, Modal, Text} from "@ui-kitten/components";
import {Fragment, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import OrSeparator from "./OrSeparator";

interface ModalActionsItemProps {
    title: string;
    buttonTitle: string;
    onPress: () => void;
}
interface ModalActionsProps {
    actions: ModalActionsItemProps[];
}

const ModalActions = ({actions}: ModalActionsProps) => {

    const [visible, setVisible] = useState(true);

    return (
        <Modal
            visible={visible}
            backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            onBackdropPress={() => setVisible(false)}
            style={{width: "75%"}}
        >
            <Card
                disabled
                style={styles.card}
            >
                {
                    actions.map((action, index) => (
                        <Fragment key={index}>
                            <Text style={styles.cardTitle}>{action.title}</Text>
                            <TouchableOpacity
                                style={{...styles.cardButton, ...(index%2===0 ? styles.filledCardButton : styles.outlinedCardButton)}}
                                onPress={() => {
                                    setVisible(false);
                                    action.onPress();
                                }}
                            >
                                <Text style={{...styles.cardButtonTitle, ...(index%2===0 ? {} : styles.outlinedCardButtonTitle)}}>{action.buttonTitle}</Text>
                            </TouchableOpacity>
                            {
                                index === actions.length - 1 ? null : (
                                   <OrSeparator />
                                )
                            }
                        </Fragment>
                    ))
                }
            </Card>
        </Modal>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 10,
    },
    cardTitle: {
        fontFamily: "Work-Sans-900",
        fontSize: 25,
        color: "#1B404E",
        textAlign: "center"
    },
    cardButton: {
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        marginVertical: 10,
        alignItems: "center"
    },
    filledCardButton: {
        backgroundColor: "#F19B3F"
    },
    outlinedCardButton: {
        borderWidth: 2,
        borderColor: "#F19B3F",
        backgroundColor: "white"
    },
    cardButtonTitle: {
        textTransform: "uppercase",
        fontSize: 19,
        fontFamily: "Work-Sans-800",
    },
    outlinedCardButtonTitle: {
        color: "#F19B3F"
    }
})

export default ModalActions;
