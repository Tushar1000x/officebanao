import React,{useRef, useState,useEffect} from 'react'
import styles from './HomePage.module.css';
import Button from '../../assets/Button.png';
import frame from '../../assets/Frame 1000005935.png'
import EditPopUp from '../edit/EditPopUp';

function HomePage() {
    const [open,setOpen]=useState(false);
    const [img,setimg]=useState();
    const fileInputRef = useRef(null);
    const [images,setImages] =useState([]);
    const [imageCount, setImageCount] = useState(0);

    useEffect(() => {
        // Check if local storage is not empty
        const uploadedImg = JSON.parse(localStorage.getItem('uploadedImg'));
        if (uploadedImg && uploadedImg.length > 0) {
            window.location.href='/DashBoard';
        }
    }, []);
 
    
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
       setOpen(false);
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setOpen(true);
            const newImage = reader.result;
            setimg(newImage);
        };
        
        reader.readAsDataURL(file);
      }
    };
    useEffect(() => {
        // Check if local storage is not empty
        const uploadedImg = JSON.parse(localStorage.getItem('uploadedImg'));
        if (uploadedImg && uploadedImg.length > 0) {
            // Navigate to the next page
            window.location.href='/DashBoard';
        }
    }, [handleFileChange]);
  return (
        <div className={styles.homepage}>
            <img src={frame} alt="" />
            <button onClick={handleButtonClick}><img src={Button} alt="" /></button>
            <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
            />
            <div className={styles.imageGallery}>
      </div>
      {open && (
        <EditPopUp open={open} setOpen={setOpen} img={img} setimg={setimg} setimgCount={setImageCount} />
      )}
     
      </div>
  )
}

export default HomePage;