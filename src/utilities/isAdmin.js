import Roles from '../roles';

const isAdmin = (user) => user?.role.name === Roles.ADMIN;

export default isAdmin;
