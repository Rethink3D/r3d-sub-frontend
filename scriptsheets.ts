const submissions: { nome: string; email: string }[] = []; // Initialize submissions array

const handleExport = () => {
  if (submissions.length === 0) {
    alert('Não há dados para exportar.');
    return;
  }

  // 1. Cria os cabeçalhos da planilha
  const headers = 'Nome,Email\n';

  // 2. Converte a lista de dados para o formato de texto CSV
  const csvContent = submissions
    .map(entry => `"${entry.nome}","${entry.email}"`)
    .join('\n');

  const csvData = headers + csvContent;

  // 3. Cria um ficheiro temporário e simula um clique para iniciar o download
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'dados_formulario.csv'); // Nome do ficheiro exportado
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
