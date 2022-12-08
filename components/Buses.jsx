import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Moment from 'moment';
import moment from 'moment/min/moment-with-locales'

export const Buses = ({navigation}) => {

    const [buses, setBuses] = React.useState();

    React.useEffect(() => {

        fetch('https://638bc08e7220b45d229618b3.mockapi.io/bus')
        .then((response) => response.json())
        .then((json) => {
          setBuses(json);
          //console.log(buses);
        }).catch(err => {
            console.log(err);
          });
      }, []);
    
    var moment = require('moment/min/moment-with-locales')

    const ChoseBus = (object) => {
        // onChange(object);
        navigation.navigate('Ticket', object);
    };

    const TimeWay = (startD, endD) => {
        let timeW = (moment(endD)-moment(startD))/1000/60;
        return ((timeW/60 | 0) + "г " + (timeW % 60) + 'хв');
    };

    const Test = (test) =>{
        console.log(test);
    };

    return <View style={styles.conteiner}>
            <FlatList data={buses} renderItem ={ ({item}) => 
                <View style={styles.blockBus}>
                    <View style={styles.displayFl}>
                        <View style={styles.paddintItems}>
                            <View>
                                <Text style={[styles.boldText, styles.bigText]}>
                                    {moment(item.dtDep).format('H:mm')}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.smallText}>
                                    {moment(item.dtDep).locale('uk').format('ddd, LLL')}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.paddintItems}>
                            <View>
                                <Text style={styles.normalText}>{item.stDepName}</Text>
                            </View>
                            <View>
                                <Text style={styles.normalText}>{item.stDepAddr}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.displayFl}>
                        <View style={styles.emptyItem}>
                        </View>
                        <View>
                            <Text style={styles.boldText}>{TimeWay(item.dtDep, item.dtArr)} Прямий рейс</Text>
                        </View>
                    </View>
                    <View style={styles.displayFl}>
                        <View style={styles.paddintItems}>
                            <View>
                                <Text style={[styles.boldText, styles.bigText]}>
                                    {moment(item.dtArr).format('H:mm')}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.smallText}>
                                    {moment(item.dtArr).locale('uk').format('ddd, LLL')}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.paddintItems}>
                            <View>
                                <Text>{item.stArrName}</Text>
                            </View>
                            <View>
                                <Text>{item.stArrAddr}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.displayFl, styles.elementSpaceBet]}>
                        <View style={styles.paddintItems}>
                            <Text style={[styles.textPrice, styles.bigText, styles.boldText]}>{item.price}</Text>
                        </View>
                        <View style={styles.paddintItems}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => ChoseBus(item)}>
                                <Text style={[styles.buttonTextStyle, styles.bigText]}>Обрати</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.displayFl, styles.elementCenter]}>
                        <View style={styles.paddintItems}>
                            <Text>Детально</Text>
                        </View>
                    </View>
                </View>
                }/>
    </View>
}

const styles = StyleSheet.create({
    conteiner:{
        alignItems:'center',
    },
    blockBus: {
      borderWidth: 1,
      borderColor: '#cc004d',
      borderRadius: 5,
      margin: 10,
      maxWidth: '95%',
      width: '95%',
    },
    paddintItems:{
        paddingLeft: 10,
        paddingRight: 10
    },
    boldText: {
        fontWeight: "bold",
    },
    bigText:{
        fontSize: 18,
    },
    smallText:{
        fontSize: 12,
    },
    normalText:{
        fontSize: 14,
    },
    displayFl:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'center',
        flexBasis: 0,
        flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    emptyItem:{
        minWidth: 100
    },
    elementCenter:{
        justifyContent: 'center'
    },
    elementSpaceBet:{
        justifyContent:'space-between'
    },
    textPrice:{
        color:'#cc004d'
    },
    buttonStyle:{
        backgroundColor: '#cc004d',
        borderRadius: 5
    },
    buttonTextStyle:{
        fontWeight: "bold",
        color: '#ffffff',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 50,
        paddingRight: 50,
        
    }
  });