import { View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";

export default function DatePicker({ date, onChange }) {
  return (
    <View>
      <DateTimePicker
        timePicker={true}
        minDate={Date.now()}
        date={date || Date.now()}
        onChange={onChange}
        selectedItemColor="#5b21b6"
        headerTextStyle={{
          fontSize: 20,
          fontWeight: "bold",
        }}
        calendarTextStyle={{
          fontWeight: "bold",
          fontSize: 16,
        }}
        headerTextContainerStyle={{
          color: "white",
        }}
        selectedTextStyle={{
          color: "#fcd34d",
          fontWeight: "bold",
          borderColor: "pink",
        }}
      />
    </View>
  );
}
