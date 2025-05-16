import { Logger } from './logs.core.js';
import { CommonFiles } from '../shared/common/files.common.js';

class Files extends CommonFiles {
    constructor(path = null){
        super(path, {
            looger: Logger
        })
    }
}

export default Files;
