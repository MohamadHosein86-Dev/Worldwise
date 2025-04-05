import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CityList from './CityList';
import CountyList from "./CountryList";
import City from './City';
import Form from './Form';
import AuthemProvider from '../contexts/AuthemProvider1';
import ALLRouteofLayout from './ALLRouteofLayout';
import PageNotFound from './PageNotFound';
import SpinnerFullPage from './SpinnerFullPage';
import CityProvider from '../contexts/CityCountext';
const  Product = lazy(()=> import("../Components_Pages/Product"));
const  Pricing = lazy(()=> import("../Components_Pages/Pricing"));
const  Login = lazy(()=> import("../Components_Pages/Login"));
const  Homepage = lazy(()=> import("../Components_Pages/Homepage"));
const  AppLayout = lazy(()=> import("./AppLayout"));

export default function App() {
 
  return (
  <AuthemProvider>
    <CityProvider>
      <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
            <Route index element={<Homepage/>}></Route>
            <Route path='product'element={<Product/>}></Route>
            <Route path='*'element={<PageNotFound/>}></Route>
            <Route path='pricing'element={<Pricing/>}></Route>
            <Route path='login'element={<Login/>}></Route>        
            <Route path='AppLayout' element={
              <ALLRouteofLayout >
                <AppLayout />
              </ALLRouteofLayout>
              }>
            <Route index  element={<Navigate replace to={"cityes"} />}></Route> 
            <Route path='cityes' element={ <CityList />}></Route>
            <Route path='cityes/:id' element={<City />}></Route>
            <Route path='counteryes' element={<CountyList />}></Route>
            <Route path='form' element={<Form />}></Route>
            </Route>

        </Routes>
      </Suspense>
      </BrowserRouter>
     </CityProvider>      
  </AuthemProvider>
  )
}
