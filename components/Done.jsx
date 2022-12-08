import { StyleSheet, View,Text, Image, TouchableOpacity} from "react-native"

export const Done = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Операція успішна</Text>
            </View>
            <View>
                <View style={styles.blockDone}>
                    <Image style={styles.image} source={require('../image/done.png')}></Image>
                </View>
                <View style={styles.circle}></View>
            </View>
            <View style={styles.blockBtn}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ListBuses')}>
                    <Text style={styles.buttonTextStyle}>На головну</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:50
    },
    blockDone:{
        position: 'relative',
        marginTop: 30
    },
    image: {
        position: 'absolute',
        top: 25,
        left: 30,
        zIndex: 1
    },
    circle: {
        backgroundColor: '#04AC00',
        width: 150,
        height: 150,
        borderRadius: 100
    },
    text:{
        fontSize: 20
    },
    blockBtn:{
        marginTop: 100
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