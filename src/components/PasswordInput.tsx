import React, {useState} from "react";
import {TouchableOpacity} from "react-native";
import {Icon, Input, InputProps} from "@ui-kitten/components";

const PasswordInput = (props: InputProps) => {

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    }

    const renderIcon = (props: any): React.ReactElement => (
        <TouchableOpacity activeOpacity={0.5} onPress={toggleSecureEntry}>
            <Icon
                {...props}
                name={secureTextEntry ? 'eye-off' : 'eye'}
            />
        </TouchableOpacity>
    );

    return (
        <Input
            {...props}
            secureTextEntry={secureTextEntry}
            accessoryRight={renderIcon}
        />
    )
}

export default PasswordInput;
