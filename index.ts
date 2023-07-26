import fs from 'fs';
import path from 'path';

function flatten(lists: any[]) {
    return lists.reduce((a: string | any[], b: any) => a.concat(b), []);
}

function getDirectories(srcpath: string) {
    const directories: string[] = []
    const files = fs.readdirSync(srcpath)
    files.forEach(file => {
        const filePath = path.join(srcpath, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            directories.push(filePath)
        }
    })
    return directories
}

function getDirectoriesRecursive(srcpath: string): string[] {
    return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}

function readFile(name: string) {
    return new Promise((resolve, reject) =>
        fs.readFile(name, function (err, data) {
            if (err) { reject(err); }
            resolve(data);
        }))
}

(() => {
    const directoriesSource = getDirectoriesRecursive(path.join(__dirname, './project'));
    const directoriesCompare = getDirectoriesRecursive(path.join(__dirname, './projectToCompare'));
    // console.log(directoriesSource.splice(0, 1));
    // directoriesSource.shift()
    // directoriesCompare.shift()

    directoriesSource?.forEach(async (directory: string) => {
        const replacedDirectory = directory.replace('project', 'projectToCompare')
        // console.log({ directory });
        // console.log(directory.replace('project', 'projectToCompare'));
        if (!directoriesCompare.includes(replacedDirectory)) {
            console.log({ replacedDirectory });

            // console.log(!fs.statSync(directory.replace('project', 'projectToCompare')).isDirectory());
            console.log('before state');

            let isDirectory = false;

            try {
                isDirectory = fs.statSync(replacedDirectory).isDirectory();
            } catch (error) {

            }

            if (!isDirectory) {
                console.log('after state');
                fs.cpSync(directory, path.join(__dirname, './projectToCompare', './', directory.split('/').pop() as string), { recursive: true })
                console.log('entrou not directories');

                return
            }
        }

        fs.readdirSync(directory).forEach(async fileName => {
            console.log('readdirSync',{fileName});
            let files: string[] = []
            let isDirectory = false;
            // console.log(file);

            try {
                isDirectory = fs.statSync(path.join(directory, fileName)).isDirectory();
            } catch (error) {

            }
            if (isDirectory) {
                files = fs.readdirSync(path.join(directory, fileName));
            } else {
                files = [fileName];
            }

            files.forEach(async (file: string) => {
                try {
                    console.log({file});

                    const files = await (await Promise.all([readFile(path.join(directory, file)), readFile(path.join(replacedDirectory, file))])).map((item: Buffer) => item.toString())
                    // console.log(files);

                    if (files[0] !== files[1]) {
                        fs.writeFileSync(path.join(replacedDirectory, file), files[0])
                    }
                } catch (error) {
                    // console.log(error);
                }
            })
            // if (!isDirectory) {
            //     console.log('file', file);

            //     const files = await (await Promise.all([readFile(path.join(directory, file)), readFile(path.join(replacedDirectory, file))])).map((item: Buffer) => item.toString())
            //     console.log(files);

            //     if (files[0] !== files[1]) {
            //         fs.writeFileSync(path.join(replacedDirectory, file), files[0])
            //     }
            // }
        });
    })
    // console.log(directoriesSource)
    // console.log(directoriesCompare)
})()