/*
Não vou criar a função de POST aqui, mas sim no socket.

Vou fazer isso por alguns motivos:
- Evitar duas fontes para a mesma ação (as rotas podem divergir e criar erro)
- A mensagem emitida pelo socket já vai ter persistência no banco de dados
- Mais simples, menos trabalhoso
*/