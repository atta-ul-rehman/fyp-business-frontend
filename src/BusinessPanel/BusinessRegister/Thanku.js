import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Animated,
  Image,
  ViewStyle,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import SkeletonLoader from "expo-skeleton-loader";

export default function Thanku({ navigation }) {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      setisLoading(false);
    }, 5000);
  }, []);
  return (
    <>
      {isLoading && <AvatarLayout />}
      <Header
        title={"Thank You" + isLoading}
        type="arrow-left"
        navigation={navigation}
      />
      {!isLoading && (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Image
            source={require("./ok-icon-3101.png")}
            style={{ height: 90, width: 90 }}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 36,
                color: "green",
                fontWeight: "900",
                padding: 10,
              }}
            >
              Thank you
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.slide2}>Your Request have been </Text>
              <Text
                style={[
                  styles.slide2,
                  { fontWeight: "700", textDecorationLine: "underline" },
                ]}
              >
                Submitted
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.slide2}>Our Team will </Text>
              <Text
                style={[
                  styles.slide2,
                  { fontWeight: "700", textDecorationLine: "underline" },
                ]}
              >
                Contact
              </Text>
              <Text style={styles.slide2}> you Shortly</Text>
            </View>
            <Text style={styles.slide2}>Bear with us!</Text>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  slide2: {
    fontSize: 16,
    fontWeight: "400",
  },
});

const AvatarLayout = ({ size = 100, style = ViewStyle }) => (
  <SkeletonLoader duration={500}>
    <SkeletonLoader.Container
      style={[{ flex: 1, flexDirection: "row" }, style]}
    >
      <SkeletonLoader.Item
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          marginRight: 20,
        }}
      />
      <SkeletonLoader.Container style={{ paddingVertical: 10 }}>
        <SkeletonLoader.Item
          style={{ width: 220, height: 20, marginBottom: 5 }}
        />
        <SkeletonLoader.Item style={{ width: 150, height: 20 }} />
      </SkeletonLoader.Container>
    </SkeletonLoader.Container>
  </SkeletonLoader>
);
