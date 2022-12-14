import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/dev";
import { LinearGradient } from "expo-linear-gradient";
import HeaderNoProfile from "../HeaderNoProfile";
import { QuizzesType } from "../../utilities/Quizzes";

type Answers = {
  [question: string]: string;
};

export type ResultsType = QuizzesType & {
  answerTracker: Answers;
};

type StackTypes = {
  Home: undefined;
  QuizPage: QuizzesType;
  ResultsPage: ResultsType;
};

type Props = NativeStackScreenProps<StackTypes, "ResultsPage">;

const ResultsPage = ({ route, navigation }: Props) => {
  var scoreTitle = "";
  var scoreDescription = "";
  var scoreImage = "";

  let { answerKey, answerTracker, resultsData, questionsData, quizCardData } =
    route.params;

  function scoring(answers: Answers, answerKey: Answers) {
    let score = 0;
    let keys = Object.keys(answerKey);
    let maxScore = keys.length;
    for (let i in answerKey) {
      if (!answers[i]) {
        continue;
      }
      if (answers[i] === answerKey[i]) {
        score++;
      }
    }
    let percentage = Math.floor((score / maxScore) * 100);
    getResults(percentage);
    return percentage;
  }

  function getResults(score: number) {
    const index = score <= 30 ? 0 : score <= 60 ? 1 : score <= 90 ? 2 : 3;
    scoreTitle = resultsData[index].name;
    scoreDescription = resultsData[index].description;
    scoreImage = resultsData[index].image;
  }

  const score = scoring(answerTracker, answerKey);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  if (fontsLoaded === false) {
    return <Text>Loading...</Text>;
  }

  function checkAnswers() {
    console.log(route.params);
  }

  return (
    <View style={styles.container}>
      <HeaderNoProfile />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.resultsText}>You Scored: {score}%</Text>
        {scoreImage && (
          <Image source={scoreImage as any} style={styles.image} />
        )}
        <Text style={styles.resultsText}>You are: {scoreTitle}</Text>
        <Text>{scoreDescription}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.resultsButton}
            onPress={() => {
              navigation.navigate("QuizPage", {
                answerKey,
                questionsData,
                quizCardData,
                resultsData,
              });
            }}
          >
            <LinearGradient
              colors={["rgba(75,0,130,1)", "rgba(75,0,130,0.64)"]}
              style={styles.linearGradient}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </LinearGradient>
          </Pressable>
          <Pressable
            style={styles.resultsButton}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <LinearGradient
              colors={["rgba(75,0,130,1)", "rgba(75,0,130,0.64)"]}
              style={styles.linearGradient}
            >
              <Text style={styles.buttonText}>Next Quiz</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
    borderStyle: "solid",
    borderColor: "#EFA80C",
    borderWidth: 5,
  },
  scrollView: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "75%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 15,
  },
  resultsText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 24,
    marginBottom: 15,
    marginTop: 15,
  },
  resultsButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 20,
    height: "auto",
    width: 130,
    marginBottom: 60,
    textAlignVertical: "center",
    textAlign: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    padding: 10,
    textAlignVertical: "center",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  linearGradient: {
    width: "100%",
    borderRadius: 20,
  },
});

export default ResultsPage;
