// import { Request, Response } from 'express';
// import { DefaultResponse } from '../models/dto/default';
// import { User } from '../models/entity/user';
// import { UserRequest } from '../models/dto/user';
// import UsersService from '../services/users';
// import { v2 as cloudinary } from 'cloudinary';

// class UsersHandler {
//   async getUsers(req: Request, res: Response) {
//     const queryName: string = req.query.name as string;

//     const userList: User[] = await UsersService.getUsers(queryName);

//     const response: DefaultResponse = {
//       status: 'OK',
//       message: 'Success retrieving data',
//       data: {
//         users: userList,
//       },
//     };

//     res.status(200).send(response);
//   }

//   async createUser(req: Request, res: Response) {
//     const payload: UserRequest = req.body;


//     const file_location = (req as any)['uploaded_profile_picture_url'];
//     const file_url = await cloudinary.uploader.upload(`storages/${file_location}`, {
//       resource_type: "auto",
//       function(error: any, result: any) { console.log(error, result); }
//     });

//     payload.profile_picture_url = file_url.secure_url;

//     // Payload validation
//     if (!payload.name) {
//       const response: DefaultResponse = {
//         status: 'BAD_REQUEST',
//         message: 'Name cannot be empty',
//         data: {
//           created_user: null,
//         },
//       };

//       res.status(400).send(response);
//     }

//     const createdUser: User = await UsersService.createUser(payload);

//     const response: DefaultResponse = {
//       status: 'CREATED',
//       message: 'User succesfully created',
//       data: {
//         created_user: createdUser,
//       },
//     };

//     res.status(201).send(response);
//   }
// }

// export default UsersHandler;
