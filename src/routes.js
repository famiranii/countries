import Country from "./countries/Country";
import Countries from "./countries/Countries";

const router =[
    {path:"/country" ,element:<Country />},
    {path:"/" ,element:<Countries />},

]

export default router