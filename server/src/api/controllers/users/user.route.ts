import { Router } from 'express';
import verifyToken from '../../../helpers/verifyToken';
import Controller from './user.controller';
import verifyAdmin from '../../../helpers/verifyAdmin';

const user: Router = Router();
const controller = new Controller();

// Retrieve all Users
user.get('/', verifyToken, verifyAdmin, controller.findAll);

// Retrieve a Specific User
user.get('/:id', verifyToken, verifyAdmin, controller.findOne);

// Update a User with Id
user.put('/:id', verifyToken, verifyAdmin, controller.update);

// Delete a User with Id
user.delete('/:id', verifyToken, verifyAdmin, controller.remove);

export default user;
