import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import { v2 as cloudinary } from 'cloudinary';


const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, './storages');
  },
  filename: (req: Request, file, cb) => {
    const [prefix] = file.mimetype.split('/');
    const filename = file.originalname.split('.');
    const extension = filename.pop();
    const fileName = `${prefix}-${Date.now()}.${extension}`;
    // Do not call cb() before the logic for setting properties in the request object
    (req as any)[`uploaded_${file.fieldname}`] = fileName;

    cb(null, fileName); // Call cb() after your logic
  },
});

export default multer({ storage });
