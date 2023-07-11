import { motion } from "framer-motion"
import PrimaryButton from "@/Components/PrimaryButton";
import StickTypeCard from "@/Pages/Parts/StickTypeCard"
import { Work } from "@/types/works";
import { Workbooks } from "@/types/workbooks";
import { IconButton } from "@mui/material";


export const ContentsBar = ({value,i,id,workbook_id,publicate,onClick,onDeleteClick,publicateClick}:
  { value:string,i:number,id:number,workbook_id:string,publicate:string,onClick?: () => void,onDeleteClick?: () => void ,publicateClick?: () => void}) => {
    const handleClick = () => {
        if(onClick){
        onClick();
        }
      };

      const handleDeleteClick = () => {
        if (onDeleteClick) {
          onDeleteClick();
        }
      };

      const onPublicateClick = () => {
        if(publicateClick){
          publicateClick();
        }
      }


return(
    <div >
    <motion.div
    className="box"
    initial={{ opacity: 0.1, scale: 1}}
    whileInView={{ opacity: 1 }}
    transition={{
      duration: 5,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}    
    onClick={handleClick}
    >
   <StickTypeCard 
   value={value}
   i={i}
   id={id}
   workbook_id={workbook_id}
   onClick={handleDeleteClick}
   publicateClick={onPublicateClick}
   publicate={publicate}
   />
  </motion.div >
  </div>

)    

}