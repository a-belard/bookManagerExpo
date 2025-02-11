import React, { useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { LibraryContext } from "../Controllers/LibraryContext";
import { LibraryContextType } from "../types";

const ChartsView: React.FC = () => {
  const { getBooksFor, getMaleAuthoredBooks, getFemaleAuthoredBooks } =
    useContext(LibraryContext) as LibraryContextType;

  const maleBooks = getMaleAuthoredBooks().length;
  const femaleBooks = getFemaleAuthoredBooks().length;

  const genderChartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [maleBooks, femaleBooks],
      },
    ],
  };

  const authorChartData = {
    labels: ["Shakespeare", "Tolkien", "Austen", "Dickens", "Bronte"],
    datasets: [
      {
        data: [
          getBooksFor("William Shakespeare").length,
          getBooksFor("J.R.R. Tolkien").length,
          getBooksFor("Jane Austen").length,
          getBooksFor("Charles Dickens").length,
          getBooksFor("Charlotte Bronte").length,
        ],
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Books by Author Gender</Text>
        <BarChart
          data={genderChartData}
          width={screenWidth}
          height={screenHeight / 3}
          chartConfig={chartGenderConfig}
          fromZero={true}
          style={styles.chartStyle}
          yAxisLabel=""
          yAxisSuffix=""
        />
        <BarChart
          data={authorChartData}
          width={screenWidth}
          height={screenHeight / 3}
          chartConfig={chartAuthorsConfig}
          fromZero={true}
          style={styles.chartStyle}
          yAxisLabel=""
          yAxisSuffix=""
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const chartGenderConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  fillShadowGradient: "#3c78f6",
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0,
  color: () => "#3c78f6",
  labelColor: () => "#000000",
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 12,
    opacity: 0.8,
  },
  propsForBackgroundLines: {
    strokeDasharray: "",
    strokeWidth: 1,
    stroke: "#ccc",
  },
};

const chartAuthorsConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  fillShadowGradient: "#65c466",
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0,
  color: () => "#65c466",
  labelColor: () => "#000000",
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 12,
    opacity: 0.8,
  },
  propsForBackgroundLines: {
    strokeDasharray: "",
    strokeWidth: 1,
    stroke: "#ccc",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartStyle: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default ChartsView;
