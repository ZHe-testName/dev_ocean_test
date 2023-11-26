import { get } from "@/api/api";
import { USERS_URL } from "@/core/constants/url.constant";
import { STORAGE_KEYS } from "@/core/types/enums/storage-keys.enum";
import { IUser } from "@/core/types/interfaces/store/users.interface";

class UsersService {
  static fetchUsers = async (): Promise<IUser[]> => {
    try {
      return get<IUser[]>(USERS_URL);
    } catch (error) {
      throw new Error('User fetch error');  
    }
  };

  static saveToLocal = <T>(key: STORAGE_KEYS, data: T): { key: STORAGE_KEYS } => {
    localStorage.setItem(key, JSON.stringify(data));

    return {
      key,
    };
  };

  static getFromLocal = <T>(key: STORAGE_KEYS): { data: T } | null => {
    const dataString = localStorage.getItem(key);

    if (dataString === null) return null;

    const data = JSON.parse(dataString);

    return {
      data,
    };
  };

  static saveToLocalAndGet = <T>(key: STORAGE_KEYS, data: T): { data: T } | null => {
    localStorage.setItem(key, JSON.stringify(data));
    
    return this.getFromLocal(key);
  };
}

export { UsersService };