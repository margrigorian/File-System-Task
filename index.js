import path from "path";
import fs from "fs/promises";

async function getFileStructure() {
  const startPath = path.resolve();
  const pathToData = path.resolve("data.json");

  // await fs.readFile(pathToData, 'utf8').then((structure) => {
  //     const fileStructureObject = JSON.parse(structure);
  //     createFileSystem(startPath, fileStructureObject);
  // })

  const fileStructureObject = await fs
    .readFile(pathToData, "utf8")
    .then((data) => {
      return JSON.parse(data);
    });

  await createFileSystem(startPath, fileStructureObject);
}

getFileStructure();

async function createFileSystem(currentPath, obj) {
  if (obj.type === "folder") {
    const pathToNewFolder = path.join(currentPath, obj.name);
    await fs.mkdir(pathToNewFolder);

    obj.children.map(async (el) => {
      await createFileSystem(pathToNewFolder, el);
    });
  } else {
    const pathToNewFile = path.join(currentPath, obj.name);
    await fs.writeFile(pathToNewFile, obj.content);
  }
}
