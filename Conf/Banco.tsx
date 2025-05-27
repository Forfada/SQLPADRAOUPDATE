import * as SQLite from 'expo-sqlite';

async function Conexao() {
    try{
        const db = await SQLite.openDatabaseAsync('PAM2');
        console.log('banco criado');
        return db;

    }catch(error){
        console.log('erro ao criar o banco ' + error);
    }
}
async function createTable(db:SQLite.SQLiteDatabase) {
    try {
        await db.execAsync(
        ` PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXIST USUARIO(
                ID_US INTEGER PRIMARY KEY AUTOINCREMENT,
                NOME_US VARCHAR(100),
                EMAIL_US VARCHAR(100)
        )`
        );
        console.log('Tabela criada');

    } catch(erro){
        console.log('erro tabela');
}
}



async function inserirUsuario(db:SQLite.SQLiteDatabase, name:string, email:string) {
    try {
        await db.runAsync(
            ` INSERT INTO USUARIO(NOME_US, EMAIL_US ) VALUES(? , ?) `, name, email
        );
        console.log('Inserido com sucesso');

    } catch (error) {
        console.log('erro ao inserir usuario ' + error);
    }
};



async function selectUsuario(db:SQLite.SQLiteDatabase) {
    try {
        const result = await db.getAllAsync(`SELECT * FROM USUARIO`);
        console.log('usuario encontrados');
        return result;

    } catch (error) {
        console.log('erro ao buscar usuarios');
    }
};

async function selectUsuarioID(db:SQLite.SQLiteDatabase, id:number) {
    try {
        const result = await db.getFirstAsync(`SELECT * FROM USUARIO WHERE ID_US = ?`,id);
        console.log('filtro de usuario por ID ');
        return result;

    } catch (error) {
        console.log('erro ao buscar o usuario ' + error);
    }
}



export { Conexao, createTable, inserirUsuario, selectUsuario, selectUsuarioID };

