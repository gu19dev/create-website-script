import fs from "fs-extra";
import inquirer from "inquirer";
import figlet from "figlet";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from 'url';

function rainbowText(text) {
    const rainbowColors = [
        'red',
        'yellow',
        'green',
        'blue',
        'magenta',
        'cyan'
    ];

    let rainbowText = '';
    for (let i = 0; i < text.length; i++) {
        const color = rainbowColors[i % rainbowColors.length];
        rainbowText += chalk[color](text[i]);
    }
    return rainbowText;
}

figlet.text("create-website", { font: "Slant" }, (err, data) => {
  if (err) {
    console.error(chalk.red("Erro ao gerar arte ASCII:"), err);
    return;
  }

  console.log(rainbowText(data));

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

      const boilerplatePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "boilerplate.html");

      try {
        const boilerplateContent = fs.readFileSync(boilerplatePath, "utf-8");

        const finalContent = boilerplateContent.replace(/\$\{projectName\}/g, projectName);

        const desktopPath = path.join(process.env.USERPROFILE, 'Desktop');
        const projectPath = path.join(desktopPath, projectName);

        const rootDirName = path.basename(projectPath);

        fs.mkdirSync(projectPath);
        fs.mkdirSync(path.join(projectPath, "css"));
        fs.mkdirSync(path.join(projectPath, "js"));
        fs.mkdirSync(path.join(projectPath, "images"));

        const titleContent = `<title>${rootDirName}</title>`;
        const finalHtmlContent = finalContent.replace(/<title>[\s\S]*<\/title>/, titleContent);
        fs.writeFileSync(path.join(projectPath, "index.html"), finalHtmlContent);

        fs.writeFileSync(path.join(projectPath, "js", "script.js"), '');
        const cssContent = `
.myDiv {
	text-align: center;
	padding-top: 100vh;
}
        `;
                fs.writeFileSync(path.join(projectPath, "css", "styles.css"), cssContent);
        

        console.log(chalk.green("Projeto criado com sucesso na área de trabalho:", projectPath));
      } catch (error) {
        console.error(chalk.red("Ocorreu um erro:"), error);
      }
    })
    .catch((error) => {
      console.error(chalk.red("Ocorreu um erro:"), error);
    });
});
