import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

import Modal from 'react-native-modalbox';
import { Button, OptionsItem, CloseButton, ListItem, ModalContainer } from '../ui';
import { goBack } from '../utils/AppTor';
import { observer, inject } from 'mobx-react/native';
import { COLORS } from '../colors';

let { width, height } = Dimensions.get('window');

@inject('appStore', 'orderStore')
@observer
export default class OptionsModal extends Component {
    state = {
        options: this.props.orderStore.selectedOptions
    }
    


    open = () => this.refs.modal.open();
    close = () => this.refs.modal.close();


    componentDidMount() {
        this.props.orderStore.fetchOptions();
    }


    handleSelectOptions = (id) => {
        const { options } = this.state;
        let tempOptions = JSON.parse(JSON.stringify(options));

        let findedIndex = options.findIndex(el => el === id);
        if (findedIndex > -1) {
            tempOptions.splice(findedIndex, 1);
            this.setState({ options: tempOptions });
        } else {
            tempOptions.push(id);
            this.setState({ options: tempOptions });
        }
    }

    activeOptions = (id) => {
        let findedIndex = this.state.options.findIndex(el => el === id);
        if (findedIndex > -1) {
            return true
        } else {
            return false;
        }
    }


    handleSelected = () => {
        this.props.orderStore.setSelectedOptions(this.state.options);
       this.props.onClose();
    }

    render() {
        const { options, loadingOptions } = this.props.orderStore;
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ModalContainer bottomRadius style={{ margin: 31 }} margin={31}>
                    {
                        loadingOptions === true ?
                            <ActivityIndicator color={COLORS.LOADER_IOS_COLOR} />
                            :
                            <View style={{ padding: 32 }}>
                                <ScrollView style={{ maxHeight: height * 0.6 }}>
                                    {
                                        options.map((item, index) => {
                                            return (
                                                <OptionsItem active={this.activeOptions(item.id)} id={item.id} onPress={this.handleSelectOptions} key={'option_key_' + item.id} last={(options.length === index + 1) ? true : false}>{item.name}</OptionsItem>
                                            )
                                        })
                                    }
                                    {/* <OptionsItem>Не курить</OptionsItem>
                                    <OptionsItem>Курящий салон</OptionsItem>
                                    <OptionsItem>БСО квитанции</OptionsItem>
                                    <OptionsItem>Обслуживание свадеб</OptionsItem>
                                    <OptionsItem>Универсал</OptionsItem>
                                    <OptionsItem>Перевозка животных</OptionsItem>
                                    <OptionsItem>Иное брендирование</OptionsItem>
                                    <OptionsItem>Бустер</OptionsItem>
                                    <OptionsItem>Брендированиее Apis</OptionsItem>
                                    <OptionsItem>Оплата сбербанк</OptionsItem>
                                    <OptionsItem>Почасовая аренда</OptionsItem>
                                    <OptionsItem>Без брендирования</OptionsItem>
                                    <OptionsItem last>Детское кресло</OptionsItem> */}
                                </ScrollView>
                                <Button onPress={this.handleSelected} style={{ marginTop: 12 }}>Добавить</Button>
                            </View>
                    }
                </ModalContainer>
                <View style={{ alignItems: 'center' }}>
                    <CloseButton onPress={this.props.onClose} />
                </View>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 47,
        margin: 31,

        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.08,
        shadowRadius: 31.00,

        elevation: 12,
    }
})