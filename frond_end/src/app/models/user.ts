export interface User {
nom?: String;
prenom?: String;
email?: String;
roles?: String;
date_inscri?: String;
etat?: boolean;
matricule?: String;
date_modif?:Date;
date_archive?:Date;
password?: String;
data?:{
    token: String;
    roles: String;
    img: String;
    email:String;
};
}
