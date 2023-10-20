import { FoodInterface } from "./IFood";
import { OrderInterface } from "./IOrder";
import { StateInterface } from "./IState";
import { UserInterface } from "./IUser";

export interface OrderDetailInterface {
    Order?: OrderInterface;
    OrderID: number;
    User?: UserInterface;
    UserName?: string;
    Address?: string;
    Food?: FoodInterface;
    FoodName?: string;
    State?: StateInterface;
    StateName?: string;
}