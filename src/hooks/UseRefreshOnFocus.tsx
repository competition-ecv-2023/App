import {useCallback, useRef} from "react";
import {useFocusEffect} from "@react-navigation/native";

export const useRefreshOnFocus = (refetch: () => Promise<any>) => {
    const firstTimeRef = useRef(true);
    useFocusEffect(
        useCallback(() => {
            if (firstTimeRef.current) {
                firstTimeRef.current = false;
                return;
            }

            console.log("refetching");

            refetch()
        }, [refetch])
    )
}
