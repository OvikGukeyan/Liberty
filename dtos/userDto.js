export class UserDto {
    email;
    id;
    isActivated;
    firstName;
    lastName;
    constructor(module) {
        this.email = module.email;
        this.id = module._id;
        this.isActivated = module.isActivated;
        this.firstName = module.firstName;
        this.lastName = module.lastName;
    }
};

