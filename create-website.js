import fs from "fs-extra";
import inquirer from "inquirer";
import figlet from "figlet";
import chalk from "chalk";

// Gerar o texto ASCII estilizado
figlet.text("create-website", { font: "Slant" }, (err, data) => {
  if (err) {
    console.error(chalk.red("Erro ao gerar arte ASCII:"), err);
    return;
  }

  // Exibir o texto ASCII estilizado em azul
  console.log(chalk.blue(data));

  // Perguntar pelo nome do projeto
  inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "Digite o nome do seu projeto:",
      },
    ])
    .then((answers) => {
      const { projectName } = answers;

      // Criar a estrutura de pastas
      fs.mkdirSync(projectName);
      fs.mkdirSync(`${projectName}/css`);
      fs.mkdirSync(`${projectName}/js`);

      fs.writeFileSync(
        `${projectName}/index.html`,
        `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/script.js"></script>
</head>
<body>
  <h1>Meu Site</h1>
</body>
</html>
`
      );

      fs.writeFileSync(
        `${projectName}/css/styles.css`,
        `
/* Seus estilos CSS aqui */
`
      );

      fs.writeFileSync(
        `${projectName}/js/script.js`,
        `
// Seu código JavaScript aqui
`
      );

      fs.mkdirSync(`${projectName}/images`);

      console.log(chalk.green("Projeto criado com sucesso!"));
    })
    .catch((error) => {
      console.error(chalk.red("Ocorreu um erro:"), error);
    });
});
