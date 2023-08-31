import Details from "./pages/details/Details";
import Countries from "./pages/countries/Countries";
import NotFound from "./pages/not-fpound/NotFound";

const router =[
    {path:"/details/:name" ,element:<Details />},
    {path:"/" ,element:<Countries />},
    {path:"*" ,element:<NotFound />},

]

export default router