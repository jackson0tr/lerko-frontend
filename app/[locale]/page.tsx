'use client'
import React,{FC,useState} from "react"
import Heading from "../utils/Heading";
import Header from '../components/Header';
import Home from "../components/Route/Home";
import Courses from "../components/Route/Courses";
import Reviews from "../components/Route/Reviews";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

interface Props{

}

const Page: FC<Props> = (props) =>{
  const [open,setOpen] = useState(false);
  const [activeItem,setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login");

  return(
    <>
    <div className="overflow-hidden">
      <Heading 
      title='ليركو' 
      description="ليركو هي عبارة عن منصة للطلاب للتعلم والحصول على المساعدة من المعلمين" 
      keywords="التسويق، تحسين محركات البحث، تحليل البيانات، علوم البيانات، البرمجة، الذكاء الاصطناعي ..." />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route}/>
      <Home/>
      <Courses/>
      <Reviews/>
      <FAQ/>
      <Footer/>
    </div>
    </>
  )
}

export default Page;