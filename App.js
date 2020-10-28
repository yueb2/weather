import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getlocation = async () => {
    try {
      //loacation 정보를 가지고 오기위해 user permission이 필요함.
      //따라서 requestPermissionsAsync를 먼저 호출해야 한다.
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      //Send to API and get weather
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert(
        "Can't find you.",
        "If you don't agree, I can't provide weather info."
      );
    }
  };
  componentDidMount() {
    this.getlocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
