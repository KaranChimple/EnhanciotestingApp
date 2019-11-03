import React, { Component } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView, TextInput, StyleSheet, FlatList, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as usersActions from '../actions/actions';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            cityName: ''
        };
        this.searchUsers = this.searchUsers.bind(this);
    }

    // componentDidMount() {
    //     this.props.actions.loadUsers();
    // }

    searchUsers() {
        // console.log("City Name before firing action - ", this.state.cityName)
        this.setState({ isLoading: true });
        this.props.actions.loadUsers(this.state.cityName);
        this.setState({ isLoading: false });
    }

    onChangeCity = (e) => {
        e.persist();
        const { name, value } = e.target;
        console.log(e.target);
        this.setState({
            cityName: value
        });
    }

    _renderItem(item) {
        console.log("RenderItem function called ", item);
        return (
            <View style={styles.cardParent}>
                <Image source={{ uri: item.avatar_url }} style={{ height: 40, width: 45, marginRight: 10 }} />
                <View>
                    <Text>{item.login}   <Text style={{fontSize: 12, fontWeight: 'bold'}}>{item.gravatar_id}</Text></Text>
                    <Text>{item.id}</Text>
                </View>
            </View>
        )
    }

    render() {
        const { isLoading } = this.state;
        const { users } = this.props;
        // console.log("USERSLIST RECEIVED -->>>", users);
        // console.log("City Name - ", this.state.cityName);
        if (isLoading) {
            return (<ActivityIndicator />);
        }
        return (
            <SafeAreaView>
                <View style={styles.parent}>

                    <View style={styles.cityInputBox}>
                        <TextInput
                            placeholder="Enter City Name"
                            onChangeText={(cityName) => this.setState({ cityName })}
                            onEndEditing={this.searchUsers}
                        />
                    </View>
                </View>
                <FlatList
                        data={users}
                        renderItem={(item) => this._renderItem(item.item)}
                        style={{paddingHorizontal: 20}}
                    />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    parent: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    cityInputBox: {
        backgroundColor: '#e97451',
        padding: 15,
        borderColor: '#bdbae2',
        borderWidth: 1,
        marginBottom: 20
    },
    cardParent: {
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',

    }
})

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(usersActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
