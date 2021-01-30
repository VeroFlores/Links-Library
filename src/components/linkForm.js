import React,{useState,useEffect} from 'react'
import {db} from '../firebase'
// cuando el componente cambia
const LinkForm=(props)=>{
    const initialSetValues={
        url:'',
        name:'',
        description:'',
    };
    const [values,setValues]=useState(initialSetValues)
    const handleInputChange = e=>{
        const{name,value}=e.target;
        setValues({...values,[name]:value})
    }
    const handleSubmit = e =>{
        e.preventDefault();
        
        props.addOrEditLink(values);
        setValues({...initialSetValues})
    }
    const getLinkById = async (id) =>{
        const doc= await db.collection('links').doc(id).get();
        setValues({...doc.data()});
    }
    useEffect(()=>{
        if(props.currentId === ''){
            setValues({...initialSetValues});
        }else{
            getLinkById(props.currentId);
        }
    },[props.currentId]);
    return (
        <form className='card card-body border-primary'onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input 
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="https://someurl.com"
                name="url"
                value={values.url}
                />
            </div>
            <div className="form-group input-group" >
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="website"
                name="name"
                value={values.name}
                />
            </div>
            <div className="form-group">
                <textarea 
                onChange={handleInputChange}
                name="description"
                placeholder="Descripción"
                rows="3" 
                className="form-control"
                value={values.description}
                >
                </textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentId === "" ? "Save" : "Update"}
            </button>
        </form>
    )
}
export default LinkForm