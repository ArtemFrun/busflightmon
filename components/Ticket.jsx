import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import React from 'react';

export const Ticket = ({navigation, route}) => {
    const [bus, setBus] = React.useState();
    const [ticket, setTicket] = React.useState();
    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [surnameError, setSurnameError] = React.useState("");
    const [selectPlace, setPlace] = React.useState(0);
    const [noteText, setNoteText] = React.useState();
    const [email, setEmail]= React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [phoneError, setPhoneError] = React.useState("");
    const [isChecked, setChecked] = React.useState(false);
    const [buttonName, setBottonName] = React.useState('Вибір місця');
    const [isChosePlace, setIsChosePlace] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [checkboxError, setCheckboxError] = React.useState(true);

    const consoleLog = (value) => {
        console.log(value);
    };

    const validationName = () => {
        if(name == ""){
            setNameError("Input name");
        }
        else{
            setNameError("");
            return true;
        }
    }

    const validationSurname = () => {
        if(surname == ""){
            setSurnameError("Input surname");
        }
        else{
            setSurnameError("");
            return true;
        }
    }

    const validationEmail = () => {
        if(email == ""){
            setEmailError("Invalid email");
        }
        else{
            setEmailError("");
            return true;
        }
    }

    const validationPhone = () => {
        if(phone == ""){
            setPhoneError("Invalide phone");
        }
        else{
            setPhoneError("");
            return true;
        }
    }

    const validationCheckbox = () => {
        if(isChecked == false){
            setCheckboxError(false);
        }
        else{
            setCheckboxError(true);
            return true;
        }
    }

    const ChosePlace = (value) =>{
        setPlace(value);
        setModalVisible(!modalVisible);
        setIsChosePlace(true);
        setBottonName('Змінити місце ('+value+')')
    }

    const Submit = () => {
        validationName();
        validationSurname();
        validationEmail();
        validationPhone();
        validationCheckbox();

        if(validationName() && validationSurname() && validationEmail()
        && validationPhone() && validationCheckbox())
        {
            console.log('submit')
            navigation.navigate('Done')
        }
    }


  

    React.useEffect(() => {
        
        // console.log(route.params)

        fetch('https://638bc08e7220b45d229618b3.mockapi.io/ticket')
        .then((response) => response.json())
        .then((json) => {
            setTicket(json);
        //   console.log(ticket[0].busTempl.matrix[0]);
        //   ticket[0].busTempl.matrix[0].map((value) => console.log(value));
        }).catch(err => {
            console.log(err);
          });
      }, []);

return (
        <View>
            <FlatList data={ticket} renderItem ={ ({item}) => 
                <View style={styles.conteiner}>
                    <View style={styles.blockBus}>
                        <View style={styles.paddintItems}>
                            <Text style={styles.bigText}>Пасажир 1</Text>
                        </View>
                        <View style={styles.paddintItems}>
                            <View>
                                <Text style={styles.labelInputText}>Імя</Text>
                                <TextInput style={styles.inputText} label="Імя"
                                underlineColorAndroid = "transparent"
                                placeholder = "Імя"
                                placeholderTextColor = "#000000"
                                autoCapitalize = "none"
                                onChangeText={(text) => setName(text)}
                                onBlur={() => validationName()}
                                ></TextInput>
                                <Text style={styles.errorMassege}>{nameError}</Text>
                            </View>
                            <View>
                                <Text style={styles.labelInputText}>Прізвище</Text>
                                <TextInput style={styles.inputText} label="Прізвище"
                                value={surname}
                                placeholder = "Прізвище"
                                placeholderTextColor = "#000000"
                                autoCapitalize = "none"
                                onChangeText={(text) => setSurname(text)}
                                onBlur={() => validationSurname()}
                                ></TextInput>
                                <Text style={styles.errorMassege}>{surnameError}</Text>
                            </View>
                        </View>
                        <View style={[styles.paddintItems, styles.elementSpaceBet, styles.displayFl, styles.marginItemsTB]}>
                            <View>
                                <Text style={[styles.boldText, styles.normalText]}>{item.cityDepName + " - " + item.cityArrName}</Text>
                            </View>
                            <View>
                                <Text style={[styles.bigText, styles.textPrice]}>{item.pricePass + " " + item.priceCName}</Text>
                            </View>
                        </View>
                        <View style={[styles.paddintItems, styles.blockWithModel]}>
                            <TouchableOpacity 
                                style={[isChosePlace ? styles.displayNone : styles.displayFl, styles.buttonStyleChose, styles.elementCenter]} 
                                onPress={() => setModalVisible(true)} >
                                <Text style={[styles.buttonTextStyleChose, styles.bigText]}>{buttonName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[isChosePlace ? styles.displayFl : styles.displayNone,styles.buttonStyle, styles.elementCenter]} 
                                onPress={() => setModalVisible(true)} >
                                <Text style={[styles.buttonTextStyle, styles.bigText]}>{buttonName}</Text>
                            </TouchableOpacity>
                            <Modal
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredViewModel}>
                                    <View style={styles.modalView}>
                                        <View></View>
                                        <View>
                                             {item.busTempl.matrix[0][0].map((place, index) => {
                                                return (
                                                    <View >
                                                        <View style={styles.displayFlRowRev}>
                                                            {item.busTempl.matrix[0].map((places) =>{
                                                                return (
                                                                    <View >{(index !== 0 ? 
                                                                    <View>
                                                                         {( typeof(places[index].n) !== 'undefined' ?
                                                                         <View>
                                                                            {(places[index].free == 1 ? 
                                                                            <View>
                                                                                {(places[index].n === selectPlace ? 
                                                                                <View>
                                                                                    <TouchableOpacity style={[styles.positionRelative, styles.paddintItems]}
                                                                                     onPress={() => ChosePlace(places[index].n)}>
                                                                                        <Text style={[styles.positionNumber, styles.boldText]}>{places[index].n}</Text>
                                                                                        <Image style={styles.imageStyle} source={require('../image/place-select.png')}></Image>
                                                                                    </TouchableOpacity>
                                                                                </View> 
                                                                                : 
                                                                                <View>
                                                                                     <TouchableOpacity style={[styles.positionRelative, styles.paddintItems]}
                                                                                     onPress={() => ChosePlace(places[index].n)}>
                                                                                        <Text style={[styles.positionNumber, styles.boldText]}>{places[index].n}</Text>
                                                                                        <Image style={styles.imageStyle} source={require('../image/place-free.png')}></Image>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                )}
                                                                            </View> 
                                                                            : 
                                                                            <View>
                                                                                <View style={[styles.positionRelative, styles.paddintItems]}>
                                                                                    <Text style={[styles.positionNumber, styles.boldText]}>{places[index].n}</Text>
                                                                                    <Image style={styles.imageStyle} source={require('../image/place-disabled.png')}></Image>
                                                                                </View>
                                                                            </View>
                                                                            )}
                                                                           
                                                                         </View>
                                                                        :
                                                                            <View style={styles.paddintItems}>
                                                                                <Text style={styles.emptyPlace}></Text>
                                                                            </View>
                                                                        )}
                                                                    </View>
                                                                    : 
                                                                    <View></View>)}               
                                                                       
                                                                    </View>
                                                                )
                                                            })}
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View>
                            <View style={[styles.paddintItems, styles.marginItemsTB]}>
                                    <Text style={styles.labelInputText}>Примітка</Text>
                                    <TextInput style={styles.inputText} label="Примітка"
                                    value={noteText}
                                    placeholder = "Примітка"
                                    placeholderTextColor = "#000000"
                                    autoCapitalize = "none"
                                    onChangeText={text => setNoteText(text)}></TextInput></View>
                            </View>
                        </View>
                    <View style={styles.blockContactInfo}>
                        <View style={styles.paddintItems}>
                            <Text style={styles.bigText}>Контактна інформація</Text>
                        </View>
                        <View style={styles.paddintItems}>
                            <Text style={styles.labelInputText}>E-mail</Text>
                            <TextInput style={styles.inputText} label="E-mail"
                            value={email}
                            placeholder = "E-mail"
                            placeholderTextColor = "#000000"
                            autoCapitalize = "none"
                            onChangeText={(text) => setEmail(text)}
                            onBlur={() => validationEmail()}
                            ></TextInput>
                            <Text style={styles.errorMassege}>{emailError}</Text>
                        </View>
                        <View style={[styles.paddintItems, styles.marginItemsTB]}>
                            <Text style={styles.labelInputText}>Телефон</Text>
                            <TextInput style={styles.inputText} label="Телефон"
                            value={phone}
                            placeholder = "Телефон"
                            placeholderTextColor = "#000000"
                            autoCapitalize = "none"
                            onChangeText={(text) => setPhone(text)}
                            onBlur={() => validationPhone()}
                            ></TextInput>
                            <Text style={styles.errorMassege}>{phoneError}</Text>
                        </View>
                        <View style={styles.paddintItems}>
                            <View style={styles.section}>
                                <View style={checkboxError ? styles.checkbox : styles.checkboxErr}>
                                    <Checkbox  value={isChecked} onValueChange={setChecked} />
                                </View>
                                <Text style={styles.paragraph}>Я приймаю умови повернення, публічної оферти 
                                        і даю згоду на обробку персональних даних.</Text>
                            </View>
                        </View>
                        <View style={[styles.paddintItems, styles.elementSpaceBet, styles.displayFl, styles.marginItemsTB]}>
                            <View>
                                <Text style={[styles.bigbigText]}>Разом:</Text>
                            </View>
                            <View>
                                <Text style={[styles.bigbigText, styles.textPrice]}>{item.pricePass + ".00 " + item.priceCName}</Text>
                            </View>
                        </View>
                        <View style={[styles.paddintItems, styles.elementSpaceBet, styles.displayFlGr, styles.marginItemsTB]}>
                            <View>
                                <TouchableOpacity style={styles.buttonStyle}>
                                    <Text style={[styles.buttonTextStyle, styles.buttonTextStyles, styles.bigText]} onPress={() => navigation.goBack()}>Назад</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.buttonStyle}>
                                    <Text style={[styles.buttonTextStyle, styles.buttonTextStyles, styles.bigText]} onPress={() => Submit()}>Сплатити</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            }/>
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        marginTop: 30,
        alignItems:'center',
    },
    blockBus: {
        borderWidth: 1,
        borderColor: '#cc004d',
        borderRadius: 5,
        width: '95%',
    },
    blockContactInfo: {
        width: '90%',
        margin: 20,
        maxWidth: '90%',
        marginTop: 40
      },
    inputText: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: '100%',
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
    },
    labelInputText:{
        fontSize: 12,
        marginTop: 5,
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
    bigbigText:{
        fontSize: 30,
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
        // flexBasis: 0,
        // flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    displayFlRowRev:{
        display: 'flex',
        flexDirection: 'row-reverse',
        flexWrap: "wrap",
        // alignItems: 'center',
        // flexBasis: 0,
        // flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    displayFlCol:{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        // flexBasis: 0,
        // flexGrow: 1,
        flex:1,
        paddingTop: 10,
        paddingBottom: 10
    },
    displayFlGr:{
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
    buttonStyleChose:{
        // backgroundColor: '#ffffff',
        borderColor: '#dbdbdb',
        borderWidth: 2,
        borderRadius: 5,
    },
    buttonTextStyleChose:{
        // fontWeight: "bold",
        color: '#000000',
        paddingLeft: 50,
        paddingRight: 50,
    },
    buttonTextStyle:{
        fontWeight: "bold",
        color: '#ffffff',
        // paddingBottom: 10,
        // paddingTop: 10,
        paddingLeft: 50,
        paddingRight: 50,
    },
    buttonTextStyles:{
        paddingBottom: 10,
        paddingTop: 10,
    },
    marginItemsTB:{
        marginBottom: 10,
        marginTop: 10,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        maxWidth: '90%'
    },
    paragraph: {
        fontSize: 12,
    },
    checkbox: {
        margin: 8,
    },
    checkboxErr: {
        margin: 8,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 5
    },
    displayNone: {
        display: 'none',
    },
    blockWithModel:{
        // position:'relative'
    },
    centeredViewModel: {
        // position: 'absolute',
        // top: '50%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        widht:'95%',
        maxHeight: '80%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    imageStyle: {
        width: 40,
        height: 40
    },
    emptyPlace:{
        width: 40,
        height: 40
    },
    positionRelative: {
        position: 'relative'
    },
    positionNumber: {
        position: 'absolute',
        left: '95%',
        top: '25%',
        // alignSelf: 'center',
        color: '#ffffff',
        zIndex: 1,
        transform: [{ translateX: -10 }]
    },
    errorMassege: {
        color: 'red',

    }
  });