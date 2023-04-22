import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    paginationContainer: {
        // position: 'absolute',
        flexDirection: 'row',
        marginVertical: height * 0.0125,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationActive: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 6,
        backgroundColor: '#F09606'
    },
    pagination: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginHorizontal: 6,
        backgroundColor: 'rgb(249,210,148)',
    },
});

const Pagination = ({
    size,
    paginationIndex,
    scrollToIndex,
    paginationDefaultColor,
    paginationActiveColor,
}) => {
    return (
        <View style={styles.paginationContainer}>
            {Array.from({ length: size }).map((_, index) => (
                <TouchableOpacity
                    style={[(paginationIndex === index) ? styles.paginationActive : styles.pagination]}
                    key={index + '-pag'}
                    onPress={() => scrollToIndex({ index })}
                />
            ))}
        </View>
    );
};

Pagination.propTypes = {
    scrollToIndex: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    paginationIndex: PropTypes.number,
    paginationActiveColor: PropTypes.string,
    paginationDefaultColor: PropTypes.string,
};

Pagination.defaultProps = {
    data: [],
    paginationIndex: 0,
    paginationActiveColor: '#F09606',
    paginationDefaultColor: '#F09606',
};



export default Pagination;
