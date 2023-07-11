import {GiLaurelCrown} from 'react-icons/gi';

const CrownIcon = ({rank,name,score}:{rank:number,name:string, score:number})=>{
    if(rank===0){
        return(<div
        style={{fontFamily:'Kaisei Decol'}}
        className='flex flex-row'>
        <GiLaurelCrown
        size={40} color='gold'
        />
            <p className='text-2xl ml-2'>{`第${rank+1}位`}</p>
            <p className='text-2xl ml-2'>{name}</p>
            <p className='text-2xl ml-2'>{`${score}点`}</p>
        </div>)
    }else if(rank===1){
        return(<div
            style={{fontFamily:'Kaisei Decol'}}
            className='flex flex-row'>
            <GiLaurelCrown
            size={30} color='silver'/>
            <p className='text-xl ml-2'>{`第${rank+1}位`}</p>
            <p className='text-xl ml-2'>{name}</p>
            <p className='text-xl ml-2'>{`${score}点`}</p>
            </div>
        )
    }else if(rank===2){
        return(<div
            style={{fontFamily:'Kaisei Decol'}}
            className='flex flex-row'>
            <GiLaurelCrown
            size={20} color='brown'
            />
            <p className='text-lg ml-2'>{`第${rank+1}位`}</p>
            <p className='text-lg ml-2'>{name}</p>
            <p className='text-lg ml-2'>{`${score}点`}</p>
            </div>
        )
    }else{
        return (<div
            style={{fontFamily:'Kaisei Decol'}}
            className='flex flex-row'>
            <p className='text-md ml-2'>{`第${rank+1}位`}</p>
            <p className='text-md ml-2'>{name}</p>
            <p className='text-md ml-2'>{`${score}点`}</p>
            </div>
        )
    }
}

export default CrownIcon;