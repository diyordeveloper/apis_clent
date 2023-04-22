import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Page, goBack, PageContent } from '../utils/AppTor';

import { AddressInput } from '../ui/Input';
import { CloseButton, Button, ModalContainer } from '../ui';

export default class AddAddressScreen extends Component {
    state = {
        value: ''
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props.address) {
            this.setState({ value: this.props.address });
        }
    }

    handleChangeAddress = value => this.setState({ value });

    handleSave = () => {
        if (this.props.onSave)
            this.props.onSave(this.state.value, this.props.type);
    }

    render() {
        const { value } = this.state;
        const { address } = this.props;
        return (
            <Page>
                <PageContent onePageAware style={{ flex: 1, justifyContent: 'center' }}>
                    {/* <View style={{ flex: 1, justifyContent: 'center' }}> */}
                    <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 24 }}>{address ? 'Изменить адрес' : 'Добавить адрес'}</Text>
                    <ModalContainer bottomRadius style={{ margin: 31 }} margin={31}>
                        <View style={{ padding: 32 }}>
                            <AddressInput onChangeText={this.handleChangeAddress} value={value} />
                            <Button disabled={value === '' ? true : false} onPress={this.handleSave} style={{ marginTop: 32 }}>{address ? 'Изменить' : 'Добавить'}</Button>
                        </View>
                    </ModalContainer>
                    <View style={{ alignItems: 'center' }}>
                        <CloseButton onPress={goBack} />
                    </View>
                    {/* </View> */}
                </PageContent>
            </Page>
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