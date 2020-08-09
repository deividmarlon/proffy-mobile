import React, { useState } from 'react'
import {View, ScrollView, Text, TextInput, Picker} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
//import DateTimePicker from '@react-native-community/datetimepicker';

import {Feather} from '@expo/vector-icons';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TecherItem';

import styles from './styles';

function TeacherList(){

    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');    
    
    const[teachers, setTeachers] = useState([]);

    const[favorites, setFavorites] = useState<number[]>([]);
        
    const [subject,setSubject] = useState('Matemática');    
    const [week_day,setWeekDay] = useState('Domingo');
    const [time,setTime] = useState('');

    const [isFiltersVisible,setIsFiltersVisible] = useState(true);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher:Teacher) => {
                    return teacher.id;
                });
                
                setFavorites(favoritedTeachersIds);
            }
        })
    }

    useFocusEffect(()=>{
        loadFavorites();        
    });

    function handleToogleFiltersVisible (){
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit(){
       
        console.log(subject,week_day,time);

        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time,
            }
        });

        if(response.data){
            setIsFiltersVisible(false)
            setTeachers(response.data);
        }
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToogleFiltersVisible}>
                        <Feather name='filter' size={20} color='#fff'/>
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>  
                        <Picker
                            selectedValue={subject}
                            style={styles.input}
                            onValueChange={(itemValue) =>{
                                setSubject(itemValue)
                                }
                            }
                        >   
                            <Picker.Item label="Matemática" value="Matemática" />
                            <Picker.Item label="Programação" value="Programação" />
                            <Picker.Item label="Artes" value="Artes" />
                            <Picker.Item label="Anatomia" value="Anatomia" />
                            <Picker.Item label="Ciência dos Astros" value="Ciência dos Astros" />
                        </Picker>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>  
                                <Picker
                                    selectedValue={week_day}
                                    style={styles.input}
                                    onValueChange={(itemValue) => {
                                        setWeekDay(itemValue);
                                    }}
                                >
                                    <Picker.Item label="Domingo" value="0" />
                                    <Picker.Item label="Segunda-feira" value="1" />
                                    <Picker.Item label="Terça-feira" value="2" />
                                    <Picker.Item label="Quarta-feira" value="3" />
                                    <Picker.Item label="Quinta-feira" value="4" />
                                    <Picker.Item label="Sexta-feira" value="5" />
                                    <Picker.Item label="Sábado" value="6" />
                                </Picker> 

                            </View>   

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text> 
                                <View style={styles.inputGroup}>
                                    <View style={styles.inputBlock}>
                                    <TextInput
                                        keyboardType='numeric'
                                        style={styles.input}
                                        value={hour}
                                        onChangeText={(text)=> setHour(text)}
                                        placeholder="00h"
                                        placeholderTextColor="#c1dccc"                                
                                    />   
                                    </View>    
                                    <Text style={styles.labelPoints}> : </Text>
                                    <View style={styles.inputBlock}>
                                    <TextInput
                                        keyboardType='numeric'
                                        style={styles.input}
                                        value={minute}
                                        onChangeText={(text)=> {
                                            setMinute(text);
                                            const newTime = hour+':'+minute;
                                            setTime(newTime);
                                        }}
                                        placeholder="00m"
                                        placeholderTextColor="#c1dccc"                                
                                    />   
                                    </View>                                                 
                                </View>                                                    
                            </View>                                                
                         </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>                              
                        </RectButton>
                        

                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >   
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
            
        </View>
    )
}

export default TeacherList;