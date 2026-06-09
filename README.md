# BonusClass

Aplicação front-end estática criada como atividade acadêmica para demonstrar um sistema simples de login, cadastro e agendamento de aulas.

## Sobre
Este projeto é um protótipo educativo — serve para testar interfaces e fluxos (Aluno / Professor / Coordenador). Não contém backend.

## Funcionalidades principais
- Login de exemplo para 3 tipos de usuário (aluno, professor, coordenador)
- Cadastro e exclusão de usuários (client-side)
- Agendamento de aulas e notificações simples

## Como usar
1. Baixe/clone o repositório.
2. Abra `BonusClass/login.html` no navegador. Se a pasta ainda se chamar `SAA`, abra `SAA/login.html`.

Recomendado: rodar um servidor local para evitar restrições de arquivos:

```powershell
cd path\to\repo
cd BonusClass
python -m http.server 8000
# abra http://localhost:8000
```

Ou com Node:

```powershell
cd BonusClass
npx http-server -p 8000
# abra http://localhost:8000
```

## Credenciais de teste
Use os usuários de exemplo presentes em `BonusClass/scripts/usuarios.json`:

- CPF: `11111111100` — senha: `12345678` (aluno)
- CPF: `22222222200` — senha: `12345678` (professor)
- CPF: `33333333300` — senha: `12345678` (coordenador)

## Estrutura do repositório
- `BonusClass/` — HTML, CSS, JS e páginas internas
- `images/` — imagens e capturas
- `LICENSE` — licença do projeto
- `README.md` — este arquivo

## Observações
- Projeto educativo — não use em produção.

## Contribuindo
- Abra uma issue com sugestões ou bugs.
- Envie um pull request para correções ou melhorias.

## Licença
Consulte o arquivo `LICENSE` no repositório.