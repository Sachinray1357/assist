import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLng = (data:any) => {
    data = JSON.stringify(data);
    return AsyncStorage.setItem('language', data);
};

export const getLng = () => {
        return new Promise((resolve:any) => {
        AsyncStorage.getItem('language').then((data:any) => {
            resolve(JSON.parse(data));
        });
    });
};
