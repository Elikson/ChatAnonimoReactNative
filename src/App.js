import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Mensagem from './components/Mensagem'
import { Button, Input } from '@rneui/base'
import database from '@react-native-firebase/database';
import { getUniqueId } from 'react-native-device-info';

export default function App() {

  const [listaMensagens, setListaMensagens] = React.useState([])
  const [textoMensagem, setTextoMensagem] = React.useState('')
  const [id, setId] = React.useState('')

  React.useEffect(() => {
    getUniqueId().then(value => {
      setId(value)
    })

    database()
      .ref('/mensagens')
      .on('value', snapshot => {
        const mensagens = Object.values(snapshot.val())
        console.log('Data: ', mensagens);
        setListaMensagens(mensagens)
      });
  }, [])

  const handleEnviarMensagem = () => {
    var data = new Date();
    database()
      .ref('/mensagens')
      .push({
        id: id,
        mensagem: textoMensagem,
        horario: `${data.getUTCHours()} : ${data.getMinutes()}`
      })
  }

  return (
    <View style={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 22 }} >Chat anônimo</Text>

      <ScrollView>
        <View style={{ marginTop: 14, display: 'flex', flex: 1, overflow: 'scroll' }}>
          {
            listaMensagens.map(data =>
              data.id == id ?
                <Mensagem direita horario={data.horario} mensagem={data.mensagem} />
                : <Mensagem horario={data.horario} mensagem={data.mensagem} />)
          }
        </View>
      </ScrollView>

      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        <Input onChangeText={text => { setTextoMensagem(text) }} placeholder='Digite sua mensagem' containerStyle={{ display: 'flex', flex: 1 }} />
        <Button onPress={() => { handleEnviarMensagem() }} title={'Enviar'} />
      </View>
    </View>
  )
}