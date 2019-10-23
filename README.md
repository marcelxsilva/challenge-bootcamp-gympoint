> Sobre o desafio

Criar o backend de uma aplicação para uma academia, onde possa ser administrado a inserção de planos, gerenciamento de clientes, checkins de usuário e registrar pedidos de ajuda em determinadas tarefas vindo dos clientes.

1ª Cadastro de Planos
Permita que o usuário possa cadastrar planos para matrícula de alunos, o plano deve possuir os seguintes campos:

title (nome do plano);
duration (duração em número de meses);
price (preço mensal do plano);
created_at;
updated_at;

Crie alguns planos como por exemplo:

Start: Plano de 1 mês por R$129;
Gold: Plano de 3 meses por R$109/mês;
Diamond: Plano de 6 meses por R$89/mês;

Rotas para administradores
/cadastrar
/listar
/editar
/excluir

-----
2ª Gestão da Matricula
O aluno pode estar cadastrado no sistema, mas sua matricula pode estar inativa.
Cadastro de matricula de aluno:

student_id (referência ao aluno);
plan_id (referência ao plano);
start_date (data de início da matrícula);
end_date (date de término da matrícula);
price (preço total calculado na data da matrícula);
created_at;
updated_at;

Rotas para administradores
/cadastrar
/listar
/editar
/excluir


FUNCIONALIDADES PARA ALUNOS

1ª Checkins: ao chegar na academia o aluno faz um checkin com o seu id cadastrado no banco, tambem servirá para monitorar a frequencia do usuário.
Tabela: checkins
Checkins:

tudent_id (referência ao aluno);
created_at;
updated_at;

Obs: o usuário só podera fazer 5 checkins dentro de 7 dias.

Rotas:
/listar todos os checkins
/ listar checkin de usuário especifico
---
3ª Pedido de auxilio
O usuário pode precisar de algum tipo de ajuda.
tabela: help_orders:
student_id (referência ao aluno);
question (pergunta do aluno em texto);
answer (resposta da academia em texto);
answer_at (data da resposta da academia);
created_at;
updated_at;

Rotas:
Listar todos os pedidos de ajuda sem resposta
criar pedidos de auxilio
listar todos os pedidos de ajuda de um usuario
academia responder um pedido de ajuda

quando um pedido de auxilio for respondido o aluno deve receber um email.
