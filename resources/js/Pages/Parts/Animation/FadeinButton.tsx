import { motion } from "framer-motion"
import PrimaryButton from "@/Components/PrimaryButton";
import BasicCard from "@/Pages/Parts/BasicCard";

export const FadeinButton = ({value,imgURL,onClick}:{ value:string,imgURL:string,onClick?: () => void }) => {
  const handleClick = () => {
    if(onClick){
    onClick();
    }
  };
return(
<div>
  <motion.div
    className="box"
    initial={{ opacity: 0.1, scale: 1}}
    animate={{ opacity: 1, scale: 1}}
    transition={{
      duration: 5,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}    
    onClick={handleClick}
    >
   <BasicCard 
   value={value}
   imgURL={imgURL}/>
  </motion.div >
  </div>
)
}