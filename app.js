document.addEventListener('DOMContentLoaded', () => {
    // Carrega o arquivo JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            
            // Verifica se está na página do ESTUDANTE (Procura a div #cursos-container)
            const cursosContainer = document.getElementById('cursos-container');
            if (cursosContainer) {
                renderCursos(data.cursos, cursosContainer);
            }

            // Verifica se está na página da SECRETARIA (Procura o tbody #alunos-tbody)
            const alunosTbody = document.getElementById('alunos-tbody');
            if (alunosTbody) {
                renderAlunos(data.alunos, alunosTbody);
            }

        })
        .catch(error => console.error("Erro ao carregar os dados:", error));
});

// Função para popular os Cards de Cursos (Painel do Estudante)
function renderCursos(cursos, container) {
    container.innerHTML = ''; // Limpa o container
    cursos.forEach(curso => {
        let badgeClass = 'badge-exatas';
        if(curso.area === 'HUMANAS') badgeClass = 'badge-humanas';
        if(curso.area === 'TECNOLOGIA') badgeClass = 'badge-tech';

        const card = document.createElement('div');
        card.className = 'curso-card';
        card.innerHTML = `
            <div class="curso-header">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/education.png" alt="Icon" width="30">
            </div>
            <div class="curso-body">
                <div><span class="badge ${badgeClass}">${curso.area}</span></div>
                <h3 style="margin-bottom: 10px;">${curso.titulo}</h3>
                <p style="font-size: 0.9em; color: var(--text-muted); flex: 1;">${curso.descricao}</p>
                <div class="curso-meta">
                    ${curso.professor} • ${curso.duracao}<br>
                    ${curso.dias} ${curso.horario}<br>
                    ${curso.vagas} vagas
                </div>
                <button class="btn btn-primary" style="width: 100%;">Selecionar este curso</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Função para popular a Tabela de Alunos (Painel da Secretaria)
function renderAlunos(alunos, tbody) {
    tbody.innerHTML = ''; // Limpa o corpo da tabela
    alunos.forEach(aluno => {
        const statusClass = aluno.status === 'PENDENTE' ? 'status-pendente' : 'status-matriculado';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="flex items-center">
                    <span class="avatar">${aluno.iniciais}</span>
                    ${aluno.nome}
                </div>
            </td>
            <td>${aluno.email}</td>
            <td>${aluno.turma}</td>
            <td><span class="status-badge ${statusClass}">${aluno.status}</span></td>
            <td>
                <a href="#" style="color: var(--text-muted); text-decoration: none;">⚙️ Opções</a>
            </td>
        `;
        tbody.appendChild(tr);
    });
}