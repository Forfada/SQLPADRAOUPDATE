import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Conexao, createTable, inserirUsuario, selectUsuario, selectUsuarioID } from './Conf/Banco';

export default function App() {

  useEffect(()=>{
    async function Main(){
      let db = await Conexao();
      await createTable(db);
      inserirUsuario(db,'Enzo','@marciojr');

      const registo = await selectUsuario(db);
        for( const linhas of registro as {ID_US:number, NOME_US:string, EMAIL_US:string}  ){
          console.log(linhas.ID_US, linhas.NOME_US, linhas.EMAIL_US)
      }

       const nome = await selectUsuarioID(db,3);
        console.log(nome.ID_US, nome.NOME_US, nome.EMAIL_US)
      

    }

    Main();
  },[])

  return (
    <View style={styles.container}>
        <Button icon="account" mode="contained" onPress={()=> console.log('Pressed')}>
          inserir
        </Button>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
