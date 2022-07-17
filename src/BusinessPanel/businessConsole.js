import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";

import { LineChart, PieChart } from "react-native-chart-kit";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import Swiper from "react-native-swiper";
import CustomStarExample from "../components/StarRating";
import MapView, { Marker } from "react-native-maps";
import Sentiment from "sentiment";
import { useSelector,useDispatch } from "react-redux";
import { BaseUrl } from "../constants/Baseurl";
const sentiment = new Sentiment();

export default function BusinessConsole({ navigation }) {
  const RES = useSelector((state) => state?.BusinessOnline?.BusinessOnline);
  const dispatch=useDispatch()
  const [sentimentScore, setSentimentScore] = useState([]);
  const [restId, setRestId] = useState();
  const [state, setState] = useState();
  const [reviewData, setreviewsData] = useState([]);
  const [restaurantsData, setrestaurantsData] = useState([]);
  const USER = useSelector((state) => state.LoginedUser.LoginedUser);

  const businessOnline = (name) => {
    dispatch({
      type: "Set_BusinessOnline",
      payload: name,
    });
  };
  const getRestReviews = async () => {
    await fetch(`http://${BaseUrl}:5000/api/v1/res/${restId}/review`)
      .then((response) => response.json())
      .then((json) => {
        setreviewsData(json.data.map((data) => data.text));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    const getData = async () => {
      await fetch(`http://${BaseUrl}:5000/api/v1/res/?user=${USER._id}`)
        .then((response) => response.json())
        .then((json) => {
          setrestaurantsData(json.data);
          setState({
            region: {
              latitude: json.data[0].location.coordinates[0],
              longitude: json.data[0].location.coordinates[1],
              latitudeDelta: 0.045,
              longitudeDelta: 0.045,
            },
          });
          businessOnline(json.data)
          setRestId(json.data[0]._id);
        })
        .catch((error) => console.error(error));
    };
    {
      USER && getData();
    }
    {
      restId && getRestReviews();
    }
  }, [USER, restId]);

  useEffect(() => {
    let score2 = [];
    reviewData.map((e) => {
      let score = sentiment.analyze(e).score;
      score2.push(score);
    });
    setSentimentScore(
      score2
        .map((e, i) => ({
          name: e > 0 ? "positive" : e == 0 ? "neutral" : "negitive",
          total: e,
        }))
        .reduce((p, c) => {
          var name = c.name;
          if (!p.hasOwnProperty(name)) {
            p[name] = 0;
          }
          p[name]++;
          return p;
        }, {})
    );
    // setSentimentScore(sentiment.analyze(phrase));
  }, [reviewData]);

  const images = [
    "https://res.cloudinary.com/dugdmyq5b/image/upload/v1650923744/_profile116266fce78213d5d805c1c099.jpg",
    "https://res.cloudinary.com/dugdmyq5b/image/upload/v1650923700/_profile116266fefa6ef520926042fd13.jpg",
    "https://res.cloudinary.com/dugdmyq5b/image/upload/v1650923647/_profile116266ff076ef520926042fd15.jpg",
  ];
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ height: 220, width: "100%" }}>
        <Swiper autoplay={false} showsPagination={false}>
          {images.map((item, index) => (
            <ImageBackground
              key={index}
              source={{ uri: item }}
              style={{ height: 220, width: "100%", justifyContent: "flex-end" }}
            >
              <View style={{ padding: 5 }}>
                <Text
                  style={{
                    fontSize: 33,
                    color: "white",
                    fontWeight: "500",
                    paddingVertical: 5,
                  }}
                >
                  {restaurantsData[0]?.restaurantName}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CustomStarExample count={restaurantsData[0]?.averageRating} />
                  <Text
                    style={{
                      paddingHorizontal: 5,
                      fontSize: 16,
                      color: "white",
                    }}
                  >
                    {restaurantsData[0]?.totalReviews}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, paddingVertical: 5, color: "white" }}
                  >
                    Closed 8am to 10{" "}
                  </Text>
                  <TouchableOpacity
                  onPress={()=>console.log(RES)}
                  >
                    <Text
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: "#ececec",
                        marginBottom: 5,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      See 10 Photos
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          ))}
        </Swiper>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        <StyledButton name="Website" icon="language" />
        <StyledButton name="Call" icon="call" />
        <StyledButton
          name="Menu"
          icon="save"
          clicked={() => {
            businessName === "Saloon" ? saloonPressed() : menuePressed();
          }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Icon name="verified" type="material" color="lightblue" size={40} />
        <Text style={{ fontSize: 18, fontWeight: "600", paddingHorizontal: 5 }}>
          Verfied Business Lisence
        </Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: "700", paddingHorizontal: 5 }}>
        Services Offered ✔
      </Text>
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <Text style={styles.text1}>Catering</Text>
          <Text style={styles.text1}>Online food</Text>
          <Text style={styles.text1}>PickUp</Text>
        </View>
        <View>
          <Text style={styles.text1}>Dining</Text>
          <Text style={styles.text1}>Private Events</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name="place" type="material" size={20} />
        <Text style={{ fontSize: 18, fontWeight: "500", paddingVertical: 10 }}>
          {restaurantsData[0]?.businessAddress}
        </Text>
      </View>
      <View>
        {state && (
          <MapView
            style={styles.mapp}
            showsUserLocation
            initialRegion={state?.region}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
          >
            <Marker
              coordinate={state?.region}
              title={"marker.title"}
              description={"lolz"}
            />
          </MapView>
        )}
      </View>
      <View style={{ padding: 5 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: -10,
          }}
        >
          <Text
            style={{ fontSize: 22, fontWeight: "bold", paddingHorizontal: 15 }}
          >
            Reviews Statistics
          </Text>
          <Image
            source={require("./average.png")}
            style={{ height: 20, width: 20 }}
          />
        </View>
        <PieChart
          data={[
            {
              name: "Positve",
              population: sentimentScore?.positive
                ? sentimentScore.positive
                : 0,
              color: "#ac0101",
              legendFontColor: "#050505",
              legendFontSize: 15,
            },
            {
              name: "Negitive",
              population: sentimentScore?.negitive
                ? sentimentScore.negitive
                : 0,
              color: "red",
              legendFontColor: "#050505",
              legendFontSize: 15,
            },
            {
              name: "Neutral",
              population: sentimentScore?.neutral ? sentimentScore.neutral : 0,
              color: "#ff5151",
              legendFontColor: "#050505",
              legendFontSize: 15,
            },
          ]}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            backgroundColor: "#194ad1",
            backgroundGradientFrom: "red",
            backgroundGradientTo: "#ffbc47",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
      <View style={{ padding: 5 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: -10,
            padding: 5,
          }}
        >
          <Text
            style={{ fontSize: 22, fontWeight: "bold", paddingHorizontal: 15 }}
          >
            Orders History
          </Text>
          <Image
            source={require("./cargo.png")}
            style={{ height: 30, width: 30 }}
          />
        </View>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "red",
            backgroundGradientFrom: "red",
            backgroundGradientTo: "red",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 1,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "white",
            },
          }}
          bezier
          style={{
            marginVertical: 18,
            borderRadius: 1,
            padding: 5,
            marginRight: 20,
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mapp: {
    paddingTop: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3.5,
  },
  slide1: {
    backgroundColor: "#9006EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text1: {
    fontSize: 16,
    fontWeight: "200",
    padding: 5,
    color: "grey",
  },
});
const StyledButton = ({ icon, name, clicked }) => (
  <TouchableOpacity
    View
    style={{
      padding: 6,
      borderWidth: 1,
      borderColor: "#cfcfcf",
      flexDirection: "row",
    }}
    onPress={clicked}
  >
    <Icon
      name={icon}
      color="grey"
      type="material"
      size={18}
      style={{ paddingRight: 3 }}
    />
    <Text style={{ color: "grey", fontSize: 13 }}>{name}</Text>
  </TouchableOpacity>
);
