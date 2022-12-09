import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const Linha = ({ item }) => {
  return (
    <Pressable onLongPress={() => confirm('deseja excluir?')}>
      <Text style={styles.item}>
        {item.nome} - {item.marca} - {item.preço} - {item.anoLançamento}
      </Text>
    </Pressable>
  );
};

const FlatListBasics = () => {
  const [lista, setLista] = React.useState([]);
  const [nome, setNome] = React.useState('');
  const [marca, setMarca] = React.useState('');
  const [anoLançamento, setAno] = React.useState('');
  const [preço, setPreço] = React.useState('');

  const cadastrar = async () => {
    await fetch(
      'https://crudpam-28171-default-rtdb.firebaseio.com/carros/.json',
      {
        method: 'POST',
        body: JSON.stringify({
          nome: nome,
          anoLançamento: anoLançamento,
          marca: marca,
          preço: preço,
        }),
      }
    );
    setNome('');
    setAno('');
    setMarca('');
    setPreço('');
    consultar();
  };

  const consultar = async () => {
    try {
      let resposta = await fetch(
        'https://crudpam-28171-default-rtdb.firebaseio.com/carros/.json'
      );
      let json = await resposta.json();
      let listaDeNomes = Object.keys(json);
      let listaDados = listaDeNomes.map((nome) => ({
        ...json[nome],
        key: nome,
      }));
      setLista(listaDados);
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    setLista([
      { nome: 'Devin', idade: 20 },
      { nome: 'Dan', idade: 20 },
      { nome: 'Dominic', idade: 20 },
      { nome: 'Jackson', idade: 20 },
      { nome: 'James', idade: 20 },
      { nome: 'Joel', idade: 20 },
      { nome: 'John', idade: 20 },
      { nome: 'Jillian', idade: 20 },
      { nome: 'Jimmy', idade: 20 },
      { nome: 'Julie', idade: 20 },
    ]);
    consultar();
  }, []);

  function Feed({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed Screen</Text>
        <View>
          <Pressable onPress={()=>{navigation.navigate("Article")}}>
            <Text>Navegar</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <View>
          <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={(texto) => setNome(texto)}
            keyboardType="name-phone-pad"
            style={{
              borderStyle: 'solid',
              borderColor: '#000',
              borderWidth: '2px',
              borderRadius: '10px',
              padding: '0.5em',
              margin: '0.5em',
              fontSize: '1em',
            }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Marca"
            value={marca}
            onChangeText={(texto) => setMarca(texto)}
            keyboardType="name-phone-pad"
            style={{
              borderStyle: 'solid',
              borderColor: '#000',
              borderWidth: '2px',
              borderRadius: '10px',
              padding: '0.5em',
              margin: '0.5em',
              fontSize: '1em',
            }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Preço (Ex: R$232,98)"
            value={preço}
            onChangeText={(texto) => setPreço(texto)}
            keyboardType="numeric"
            style={{
              borderStyle: 'solid',
              borderColor: '#000',
              borderWidth: '2px',
              borderRadius: '10px',
              padding: '0.5em',
              margin: '0.5em',
              fontSize: '1em',
            }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Data de Lançamento (Ex: 29/12/2022)"
            value={anoLançamento}
            onChangeText={(texto) => setAno(texto)}
            keyboardType="numeric"
            style={{
              borderStyle: 'solid',
              borderColor: '#000',
              borderWidth: '2px',
              borderRadius: '10px',
              padding: '0.5em',
              margin: '0.5em',
              fontSize: '1em',
            }}
          />
        </View>
        <View style={{ flex: '1', alignItems: 'center' }}>
          <Pressable
            onPress={cadastrar}
            style={{
              borderStyle: 'solid',
              borderColor: '#000',
              borderWidth: '2px',
              borderRadius: '10px',
              padding: '0.5em',
              margin: '0.5em',
              backgroundColor: '#00f',
            }}>
            <Text style={{ fontSize: '1em', color: '#fff' }}>Cadastrar</Text>
          </Pressable>
        </View>
      </View>
      <FlatList data={lista} renderItem={Linha} />
    </View>
  );
};

export default FlatListBasics;
