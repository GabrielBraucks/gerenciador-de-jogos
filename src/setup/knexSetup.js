const knex = require('knex');
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database.sqlite'
    },
    useNullAsDefault: true
});

async function createTables() {
    try {
        await db.schema.createTable('Jogo', table => {
            table.integer('id').primary();
            table.string('nome', 45).unique();
            table.integer('minJogadores', 45);
            table.integer('maxJogadores', 45);
        });

        await db.schema.createTable('Jogador', table => {
            table.integer('id').primary();
            table.string('nome', 45);
            table.string('senha', 45);
        });

        await db.schema.createTable('Partida', table => {
            table.integer('id').primary();
            table.integer('idJogo').references('id').inTable('Jogo');
            table.integer('idJogadorCriadorDaPartida').references('id').inTable('Jogador');
            table.integer('quantidadeEquipes');
            table.integer('limiteRodadas');
            table.integer('quantidadeRodadas');
            table.boolean('empate');
        });

        await db.schema.createTable('Equipe', table => {
            table.integer('id').primary();
            table.integer('idPartida').references('id').inTable('Partida');
            table.boolean('solo');
            table.integer('tamanho');
            table.integer('pontos');
            table.boolean('vitorioso');
        });

        console.log('Tabelas criadas com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    } finally {
        db.destroy();
    }
}

module.exports = { db, createTables };

// createTables();