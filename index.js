const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const readline = require('readline');

// Путь к архиву с файловой системой (ZIP)
const archivePath = process.argv[2];

// Создаем интерфейс командной строки для ввода команд
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'vshell---> ',
});

// Обработчик события "line" для ввода команд
rl.on('line', (line) => {
    const args = line.trim().split(' ');
    const command = args[0];

    switch (command) {
        case 'pwd':
            //Возвращаем путь к текущей дирректории
            console.log('Current directory:', process.cwd());
            break;

        case 'ls':
            //readdir  аснх функция для чтения файлов, первым параметром служит путьк текущей директории. files - массив файлов и директорий в данной
            fs.readdir(process.cwd(), (err, files) => {
                if (err) {
                    console.error('Error reading directory:', err);
                } else {
                    console.log('Files in current directory:');
                    files.forEach((file) => {
                        console.log(file);
                    });
                }
                //приглашение
                rl.prompt();
            });
            break;

        case 'cd':
            const rootDir = '/';
            const targetDir = args[1];
            try {
                if (rootDir === args[1]) {
                    process.chdir("C:\\Games\\dsa\\temp\\zip")
                    console.log('Root directory: ', process.cwd());
                }
                else {
                    process.chdir(targetDir);
                    console.log('Changed directory to:', process.cwd());
                }
            } catch (err) {
                console.error('Error changing directory:', err);
            }
            rl.prompt();
            break;

        case 'cat':
            const filePath = args[1];
            //не undefined
            if (filePath) {
                //Читаем файл и вызываем колбек , если отсуствует ошибка, выводит data на экран
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading file:', err);
                    } else {
                        console.log('File content:\n', data);
                    }
                    rl.prompt();
                });
                // другом случае выводим ошибку
            } else {
                console.error('Usage: cat <filename>');
                rl.prompt();
            }
            break;

        default:
            console.error('Unknown command:', command);
            rl.prompt();
            break;
    }
});

// Обработчик события "close" для завершения работы программы
rl.on('close', () => {
    console.log('Exiting vshell...');
    process.exit(0);
});

// Проверяем, был ли передан путь к архиву
if (!archivePath) {
    console.error('Usage: node vshell.js <filesystem.zip>');
    process.exit(1);
}

// Извлекаем содержимое архива и сохраняем его во временную директорию
const tempDir = path.join(__dirname, 'zip');
const zip = new AdmZip(archivePath);
zip.extractAllTo(tempDir, /*overwrite*/ true);

// Устанавливаем начальную рабочую директорию для vshell
process.chdir(tempDir);

// Выводим приветственное сообщение и включаем интерфейс командной строки
console.log('Welcome to vshell!');
rl.prompt();





// const readline = require('readline');
//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
//
//
// let arrOfStr = [];
// const hash = new Map();
// let sum = 0;
// let cnt = 0;
// rl.on('line', (line) => {
//     arrOfStr.push(line);
//     cnt++;
//     if (cnt === 2) {
//         for (let i = 0; i < arrOfStr[0].length; i++) {
//             hash[arrOfStr[0][i]] = 1;
//         }
//
//         for (let i = 0; i < arrOfStr[1].length; i++) {
//             if (hash[arrOfStr[1][i]] >= 1) {
//                 sum += 1;
//             }
//         }
//         process.stdout.write(sum.toString());
//     }
// })
//Тестовое задание яндекс 1

// const readline = require('readline');
//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
//
//
// let binaryArray = [];
// let tempArray = [];
// let maxLen = 0;
// let cnt = 0;
// let cntOfLine = 0;
// let temp = 0;
// rl.on('line', (line) => {
//     tempArray.push(line);
//     temp = parseInt(tempArray[0]);
//     if ((line === "1" || line === '0') && tempArray.length > 1) {
//         binaryArray.push(line);
//     }
//     if (cntOfLine === temp) {
//         rl.close();
//     }
//     cntOfLine++;
// });
//
// rl.on('close', () => {
//     for (let i = 0; i < binaryArray.length; i++) {
//         if (binaryArray[i] === "1") {
//             cnt++;
//             if (cnt > maxLen) maxLen = cnt;
//         }
//         else {
//             cnt = 0;
//         }
//     }
//     console.log(maxLen);
//     //process.stdout.write(maxLen.toString());
//
// })
//Второе тестовое задание яндекс


// const readline = require('readline');
//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
//
//
// let arr = [];
// let res = [];
// let tempArray = [];
// let cntOfLine = 0;
// let temp = 0;
// rl.on('line', (line) => {
//     tempArray.push(line);
//     temp = parseInt(tempArray[0]);
//     if (tempArray.length > 1 && parseInt(tempArray[0]) > 0) {
//         arr.push(line);
//     }
//     if (parseInt(tempArray[0]) <= 0) rl.close();
//     if (cntOfLine === temp) rl.close();
//     cntOfLine++;
// });
//
// rl.on('close', () => {
//     res = arr.filter((item, index) =>
//         arr.indexOf(item) === index
//     );
//     res.sort(function (a, b) {
//         if (a > b) return 1;
//         if (a < b) return -1;
//         else return 0;
//     })
//     if (res.length === 0) console.log("")
//     for(let item in res) {
//         console.log(res[item])
//     };
//     //process.stdout.write(maxLen.toString());
//
// })
//



