import React, {useState} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import Header from '../Header'
import QuizAnswer from '../QuizAnswer'
import QuizQuestion from '../QuizQuestion'
import QuizPicture from '../QuizPicture'
import {questionsData} from "../../utilities/QuestionsData"
import {GetImage} from "../../utilities/images"
import RadioGroup, {RadioButtonProps } from 'react-native-radio-buttons-group'


const QuizPage = () => {
    const [questionNumber, setQuestionNumber] = useState(0)

    const [answerTracker, setAnswerTracker] = useState({})
    let answersData: RadioButtonProps[] = questionsData[questionNumber].answers!
   

    const [answers, setAnswers] = useState<RadioButtonProps[]>(answersData)

    function changeQuestion(){
        setQuestionNumber(prev => prev + 1)
    }



    function onPressRadioButton(radioButtonsArray:RadioButtonProps[]) {
        let answer = radioButtonsArray.filter((object)=>{if(object.selected){return object}})
        setAnswerTracker({...answerTracker, [questionNumber]:answer[0].value})
        setAnswers(radioButtonsArray);
    }

    function checkAnswers() {
        console.log(answerTracker)
        console.log(questionsData)
    }

    const yoda = GetImage(`image${questionNumber}`, questionsData)!
    return (
        <View>
            <Header/>
            <View style={styles.pictureContainer}>
                <QuizPicture source={ yoda}/>
                <QuizQuestion question={questionsData[(questionNumber)].question!} />
                <RadioGroup radioButtons={questionsData[(questionNumber)].answers!} onPress={onPressRadioButton}/>
                <Button onPress={changeQuestion} title="Next"></Button>
                <Button onPress={checkAnswers} title="Check"></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pictureContainer:{
        alignItems: 'center',
        margin: 50
    }
})

export default QuizPage