import { FoodInterface } from "./IFood";
import { StateInterface } from "./IState";
import { UserInterface } from "./IUser";

export interface OrderInterface {
   
    ID?: number;   
    StateID?: number;
    State?: StateInterface;
    UserID?: number;
    User?: UserInterface;
    FoodID?: number;
    Food?: FoodInterface;
}