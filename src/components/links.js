import React,{useEffect,useState} from 'react'
// useState para pintarlos se debe guardar en el estado
// combinacion para que cuando carga el componente haga petición a firebase.
import LinkForm from './linkForm'
import { toast } from 'react-toastify';
import {db} from '../firebase'
const Links =()=>{
    const [links,setLinks]=useState([]);
    const [currentId,setCurrentId]=useState('');
    const addOrEditLink = async (linkObject) =>{
        if(currentId === ''){
            await  db.collection('links').doc().set(linkObject);
            toast("Comment added",{type:'success'});
        }else{
           await db.collection('links').doc(currentId).update(linkObject);
           toast('Link updated successfully',{type:'info'});
           setCurrentId('');
        }
    }
    // usamos onSnapShot porque queremos hacer traer data en tiempo real
    const getLinks= async ()=>{
        db.collection('links').onSnapshot(
          
            (querySnapshot) => {
                const docs=[];
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(),id:doc.id})

                })
                setLinks(docs);
            }
        );
        
    }
    const onDeleteLink=async (id)=>{
        if(window.confirm('are you sure to want to delete this link?')){
           await db.collection('links').doc(id).delete();
        }
        toast("link removed",{type:'error'});
    }
    useEffect(()=>{
        getLinks();
    },[]);

    return (
        <>
            <div className="col-sm-4 mt-2">
            <LinkForm {...{addOrEditLink,currentId,links}}/>
            </div>
            <div className="col-sm-6 mt-2">
                {links.map((link)=>(
                    <div className="card mb-1 col-10" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                            <h4>{link.name}</h4>
                            <i className="material-icons text-danger" onClick={()=>onDeleteLink(link.id)}>close</i>
                            <i className="material-icons" onClick={()=>setCurrentId(link.id)}>create</i>
                            </div>

                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noreferrer">
                                Go To Website
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Links