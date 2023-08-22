import Details from "./countries/Details";
import Countries from "./countries/Countries";

const router =[
    {path:"/Details/:name" ,element:<Details />},
    {path:"/" ,element:<Countries />},

]

export default router