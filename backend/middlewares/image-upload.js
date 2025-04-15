import multer from "multer";
import path from "path";
import fs from "fs";

// Configuração do armazenamento de imagens
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("user")) {
      folder = "users";
    }

    const folderPath = path.resolve("public", "imgs", folder);
    console.log(folderPath)

    // Cria a pasta se ela não existir
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Exporta o middleware de upload com filtro de extensão
export const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas arquivos .jpg ou .png!"));
    }
    cb(null, true);
  },
});
