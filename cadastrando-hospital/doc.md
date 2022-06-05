* Precisamos construir uma lógica para pacientes que:

1. Cadastre todos os pacientes no sistema.
[POST] - "/creatNewPatient"
2. Liste todos os pacientes existente nesse hospital.
[GET] - "/allPatients" ok 
3. Traga um paciente pelo nome, caso a paciente tenha nome social, trazer por nome social e pelo ID.
[GET] - "/searchPatient" params.query ok
4. Atualizar o cadastro de um paciente.
[PUT] - "/updatePatient"
5. Deletar o cadastro de um paciente.
[DELETE] - "/deletePatient"

* Agora precisamos construir uma lógica pra mapear os motivos/sintomas para esse paciente está se consultando:

1. Cadastro de todos os sintomas atrelados a este paciente, contendo a data de consulta
2. Listar todos os sintomas de todas as vezes que este paciente esteve no hospital
3. Listar todos os sintomas de todas os pacientes que há no sistema
4. Listar por sintomas, para mapear os sintomas mais frequentes
5. Analisar se há algo que cabe ser atualizado nessa ficha médica
6. Pensar se é válido deletar alguma ficha médica