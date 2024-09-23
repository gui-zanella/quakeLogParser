# Roadmap do Projeto

Este documento descreve as histórias de usuário atendidas e como foram implementadas.

## Histórias Atendidas

### História 1

**Descrição:**
Eu como administrador do jogo, quero ter a estatística por jogo, do total de mortes, de mortes por causa e de mortes causadas pelo `<world>` para entender a dificuldade dos jogadores.

**Implementação:**

1. **Análise da Requisição:**
   - Identifiquei a necessidade de processar os logs do jogo para extrair estatísticas específicas.
   - As estatísticas incluem:
     - Total de mortes.
     - Mortes por causa.
     - Mortes causadas pelo `<world>`.
     - Mortes causadas pelos jogares.

2. **Estrutura do Serviço de Parser de Logs:**
   - Criei um serviço `LogParserService` responsável por analisar as linhas de log e calcular as estatísticas.
   - A função principal `parseLog` foi implementada para processar as linhas de log e retornar um objeto com as estatísticas.

3. **Implementação da Função `parseLog`:**
   - A função `parseLog` recebe um array de linhas de log como entrada.
   - Utiliza o método `String.prototype.split()` para extrair informações necessárias de cada linha de log.
   - Calcula o total de mortes, mortes por causa, mortes causadas pelo `<world>`, e mortes por jogador.

4. **Testes Unitários:**
   - Criei testes unitários para garantir que a função `parseLog` funciona corretamente.
   - Testes incluem casos de logs vazios, logs com mortes e logs com mortes causadas pelo `<world>` e outros jogadores.

5. **Integração com a API:**
   - Integrei o serviço `LogParserService` com o controlador `StatisticController` para expor as estatísticas via uma API REST.

---

## Próximos passos

Se tivesse mais tempo, além de atender as outras histórias.
- Teria feito um aws lambda, exposto via api gateway, que busca o arquivo de log no S3, processa ele e obtém os dados necessários para as apis. E salva esses dados num DynamoDB - Banco não relacional de chave:valor - assim a chave de busca pode ser o nome do arquivo no S3 e o valor o json com as estatísticas.

- Ou, poderia configurar um trigger para buscar e processar o arquivo assim que ele subir no S3, configurando no cloudformation do lambda uma api que será disparada sempre que um arquivo for colocado no s3, em uma pasta específica, automatizando o processo e disponibilizando os dados no dynamo sempre que o s3 receber um arquivo novo. Após o processamento do arquivo, o lambda move ele para a pasta de arquivos processados. Qualquer erro durante o processamento o lambda pode colocar em uma pasta de erros, que pode ser revisada futuramente de modo manual ou não. Além é claro de todos os lambdas terem seu cloudwatch, com um log de erros para troubleshooting.
Sendo 2 apis: uma para o administrador buscar os dados e a responsável por processar os dados.
