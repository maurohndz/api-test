import UserController from '../controllers/User.controller.js';

export function mountRouter(main) {
    UserController(main);
}
