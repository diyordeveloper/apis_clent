import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem, Button, HistoryItem } from '../ui';
import { LittleText } from '../ui/Text';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import { observer, inject } from 'mobx-react/native';

let { width, height } = Dimensions.get('window');

@inject('orderStore')
@observer
export default class TimeScreen extends Component {

    state = {
        dateTime: new Date(moment().add(1, 'hours')),
        showDate: false,
        showTime: false
    }

    // onPickerSelect(index) {
    //     this.setState({
    //         selectedItem: index,
    //     })
    // }
    // onHour = (index) => this.setState({ hour: index });
    // onMinute = (index) => this.setState({ minute: index });

    handleShowDatePicker = () => {
        this.setState({ showDate: !this.state.showDate, showTime: false });
    }

    handleShowTimePicker = () => {
        this.setState({ showTime: !this.state.showTime, showDate: false });
    }

    handleDate = (event, date) => {
        console.log(date);
        if (!date) {
            this.setState({ showDate: false, showTime: false });
            return;
        }

        if (Platform.OS === 'ios') {
            this.setState({ dateTime: date });
        } else {
            this.setState({ dateTime: date, showDate: false, showTime: false });
        }
    }

    handlePressSelectDate = () => {
        this.props.orderStore.setInningAt(moment(this.state.dateTime).format('YYYY-MM-DD HH:mm:ss'));
        goBack();
    }

    componentDidMount() {
        const { inning_at } = this.props.orderStore;
        if (inning_at) {
            console.log(moment(inning_at));
            this.setState({ dateTime: new Date(moment(inning_at)) }, () => {
                console.log(this.state.dateTime);
            });
        }
    }

    render() {
        const { dateTime, showDate, showTime } = this.state;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Запланировать" />
                </Navbar>
                <PageContent onePage>
                    <View style={{ paddingHorizontal: 32, overflow: 'visible' }}>
                        <LittleText style={{ marginTop: 36 }}>Время указывается в часавом поясе места поездки</LittleText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={this.handleShowDatePicker}>
                                <Text style={[styles.time]}>{moment(dateTime).format('DD MMMM YYYY')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleShowTimePicker}>
                                <Text style={[styles.time]}>{moment(dateTime).format('HH:mm')}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            showDate &&
                            <DateTimePicker
                                locale="ru-RU"
                                minimumDate={new Date(moment().add(1, 'hours'))}
                                value={dateTime}
                                mode={'date'}
                                is24Hour={true}
                                display={Platform.OS === 'ios' ? "spinner" : 'default'}
                                onChange={this.handleDate}
                                style={{ width: '100%', height: 180 }}
                            />
                        }
                        {
                            showTime &&
                            <DateTimePicker
                                locale="ru-RU"
                                minimumDate={new Date(moment().add(1, 'hours'))}
                                value={dateTime}
                                mode={'time'}
                                is24Hour={true}
                                display={Platform.OS === 'ios' ? "spinner" : 'default'}
                                onChange={this.handleDate}
                                style={{ width: '100%', height: 180 }}
                            />
                        }

                        {/* <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', paddingVertical: 24 }}>

                            <Picker style={{ height: 180, flex: 4 }}
                                selectedValue={this.state.selectedItem}
                                itemStyle={{ color: "#333", fontSize: 26 }}
                                onValueChange={(index) => this.onPickerSelect(index)}
                            >
                                {this.state.itemList.map((value, i) => (
                                    <PickerItem label={value} value={i} key={"cat" + value} />
                                ))}
                            </Picker>
                            <Picker style={{ flex: 1, height: 180 }}
                                selectedValue={this.state.hour}
                                itemStyle={{ color: "#333", fontSize: 26 }}
                                onValueChange={this.onHour}
                            >
                                {this.state.hours.map((value, i) => (
                                    <PickerItem label={value} value={i} key={"hour" + value} />
                                ))}
                            </Picker>
                            <Picker style={{ flex: 1, height: 180 }}
                                selectedValue={this.state.minute}
                                itemStyle={{ color: "#333", fontSize: 26 }}
                                onValueChange={this.onMinute}
                            >
                                {this.state.minutes.map((value, i) => (
                                    <PickerItem label={value} value={i} key={"minutes" + value} />
                                ))}
                            </Picker>
                            <View style={{ position: 'absolute', height: 1, width: '100%', left: 0, top: 91, backgroundColor: '#C4C4C4', opacity: 0.13 }}></View>
                            <View style={{ position: 'absolute', height: 1, width: '100%', left: 0, top: 137, backgroundColor: '#C4C4C4', opacity: 0.13 }}></View>
                        </View> */}
                        <Button onPress={this.handlePressSelectDate} style={{ marginTop: 25 }}>Выбрать</Button>
                    </View>

                </PageContent>
            </Page>
        );
    }
}


const styles = StyleSheet.create({
    time: {
        fontSize: 18,
        fontFamily: 'Gilroy-Regular',
        marginTop: 25
    }
})