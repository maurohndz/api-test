import path from 'path';
import { promises as fs } from 'fs';
import { fileTypeFromBuffer } from "file-type";
import { generateRandomString } from '../utils/crypto.utils.js';

export class CommonFiles {
    constructor(pathFile = null, { looger }) {
        this.path  = pathFile;

        if (looger) this.looger = looger;
    }

    async processBase64(base64String) {
        try {
            const now = new Date();
            const year = now.getFullYear().toString();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const matches = base64String.match(/^data:(.+);base64,(.+)$/);

            if (matches) {
                let base64Data = matches[2];

                this.fileType = matches[1].split('/')[1];
                this.buffer = Buffer.from(base64Data, 'base64');
            } else {
                this.buffer = Buffer.from(base64String, 'base64');
                this.fileType = await fileTypeFromBuffer(this.buffer);
            }

            // TODO: generate name recursive
            const randomString = generateRandomString();
            const directory = `/${year}/${month}/${day}`;

            this.name = `${randomString}.${this.fileType?.ext ? this.fileType?.ext : this.fileType}`;
            this.fileName = `${directory}/${this.name}`;
            this.path = path.join(process.env.NFS_FILES, directory);
        } catch (error) {
            if (this.looger) this.looger.error(`[FILES] ${error}`);

            throw error;
        }
    }

    async save() {
        try {
            const pathFile = path.join(this.path, this.name);

            await fs.mkdir(this.path, { recursive: true });
            await fs.writeFile(pathFile, this.buffer);
        } catch (error) {
            if (this.looger) this.looger.error(`[FILES] ${error}`);

            throw error;
        }
    }

    async delete() {
        try {
            const pathFile = path.join(process.env.NFS_FILES, this.path);

            await fs.access(pathFile);
            await fs.unlink(pathFile);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                if (this.looger) this.looger.error(`[FILES] ${error}`);

                throw error;
            }
        }
    }
}
