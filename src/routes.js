import Details from "./details/Details";
import Countries from "./countries/Countries";

const router =[
    {path:"/details/:name" ,element:<Details />},
    {path:"/" ,element:<Countries />},

]

export default router