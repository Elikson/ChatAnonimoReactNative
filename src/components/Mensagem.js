import { View, Text } from 'react-native'
import React from 'react'

export default function Mensagem(props) {
    return (
        <View style={{ width: 180, margin: 10, display: 'flex', alignSelf: props.direita ? 'flex-end' : 'flex-start' }}>
            <View style={{ backgroundColor: '#cdcdcd', borderRadius: 8 }}>
                <Text style={{ padding: 8, color: 'black' }}>{props.mensagem}</Text>
            </View>
            <Text>{props.direita ? 'Você' : 'Pessoa'} - {props.horario}</Text>
        </View>
    )
}