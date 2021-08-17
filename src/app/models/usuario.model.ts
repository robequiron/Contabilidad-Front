/**
 * Model user
 * 
 * Modelo usuario
 */
 export class Usuario {
    
    /**
     * Nombre del usuario
     */
    public name:String;
    /**
     * Email del usuario
     */
    public email: String;
    /**
     * Password del usuario
     */
    public password: String;

    /**
     * Roles
     */
    public rol: String = 'USER_ROLE';
    /**
     * Identificador del usuario
     */
    public _id: String;
    /**
     * Imagen del usuario
     */
    public img: String;

    

    
    /**
     * Model user
     * 
     * @param name Name user
     * @param email Email user
     * @param password Passwor user
     * @param rol Rol user (SUPER_ROLE, ADMIN_ROLE, USER_ROLE)
     * @param _id Identifier user
     * @param img Image user 
     */
    constructor(
        name:String,
        email: String,
        password: String,
        rol: String = 'USER_ROLE',
        _id?: String,
        img?: String,
    ){
        this.name = name;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this._id = _id || null;
        this.img = img || null; 
    }

    

}

