import Toast from "react-native-toast-message";


export const showToast = (type, text1, text2 = "") => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 3000,
      position: "bottom",
      bottomOffset: 100,
    });
  };