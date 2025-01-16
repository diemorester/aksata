import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, fileName: string) => void;

export const uploader = (
    filePrefix: string,
    folderName?: string,
    fileLimit?: number
) => {
    const defaultDir = path.join(__dirname, '../../public');

    const fileFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
    ) => {
        const allowedExt = /\.(jpg|png)$/;
        const isExtMatch = file.originalname.toLocaleLowerCase().match(allowedExt);
        if (isExtMatch) {
            cb(null, true);
        } else {
            const error = new Error('your file extension is denied')
            cb(error)
        }
    };

    const storage = multer.diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: DestinationCallback,
        ) => {
            const destination = folderName ? defaultDir + folderName : defaultDir;
            cb(null, destination);
        },
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: FileNameCallback
        ) => {
            const originalNameParts = file.originalname.split('.');
            const fileExtension = originalNameParts[originalNameParts.length - 1];
            const newFileName = filePrefix + Date.now() + '.' + fileExtension;
            cb(null, newFileName);
        }
    });
    const limits = { fileSize: fileLimit || 1 * 1024 * 1024 }
    return multer({ storage: storage, fileFilter: fileFilter, limits })
};