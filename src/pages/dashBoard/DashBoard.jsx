import React, { useState, useEffect,useRef } from 'react';
import styles from './DashBoard.module.css';
import Masonry from 'react-masonry-css';
import EditPopUp from '../edit/EditPopUp';
import options from '../../assets/pngwing.com.png'
function DashBoard() {
    const [open,setOpen]=useState(false);
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const fileInputRef = useRef(null);
  const [img,setimg]=useState();
  const [imageCount, setImageCount] = useState(0);
  // Function to fetch images from local storage
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('uploadedImg'));
    if (storedImages) {
      setImageCount(storedImages.length);
      setImages(storedImages);
    }
    
  }, []);


  function capitalizeFirstAndLast(str) {
    let words = str.charAt(0).toUpperCase() + str.charAt(str.length-1).toUpperCase() ;
    return words;
  }

  // Function to handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle filter selection
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  // Filter images based on search term and filter
  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === '' || image.category === filter)
  );
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
  const handleEdit = (image) => {
    // Add your edit logic here
    console.log("Editing image:", image);
  };

  // Function to handle delete
  const handleDelete = (image,name) => {
    const updatedImgInfo = images.filter(asset => asset.name !== name );
        setImages(updatedImgInfo);
        localStorage.setItem('uploadedImg', JSON.stringify(updatedImgInfo));
  };
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('uploadedImg'));
    if (storedImages.length === 0) {
      window.location.href='/'; // Reload the page if there are no images
    }
    
  }, [handleDelete]);
  
  useEffect(() => {
    if (imageCount === 1) {
      window.location.reload(); // Reload the page if a new image is added
    }
    setImageCount(0);
  }, [imageCount]);
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <input
         className={styles.searchInput}
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={filter} onChange={handleFilter}>
          <option value="landscape">Newest First</option>
          <option value="portrait">Newest First</option>
          <option value="nature">A-Z</option>
          {/* Add more options as needed */}
        </select>
        <button onClick={handleButtonClick}><span>+</span>&nbsp;&nbsp;Add</button>
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
            />
      </div>
      <div className={styles.bottom}>
        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
          className={styles.masonryGrid}
          columnClassName={styles.masonryGridColumn}
        >
          {images.map((image, index) => (
  <div key={index} className={styles.imageContainer}>
    <img src={image.image} alt={image.name} />
    <div className={styles.name}>{image.name}</div>
    <div className={styles.imageOptions}>
      {/* Add your options/buttons here */}
      
      <button  onClick={() => handleEdit(image)}>{capitalizeFirstAndLast(image.name)}</button>
      <button className={styles.optionButton} onClick={() => handleDelete(image,image.name)}><img src={options}></img></button>
    
    </div>

  </div>
))}

                  {/* {filteredImages.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <img src={image.url} alt={image.name} />
            </div>
          ))} */}
        </Masonry>
      </div>
      {open && (
        <EditPopUp open={open} setOpen={setOpen} img={img} setimg={setimg} setimgCount={setImageCount} />
      )}
    </div>
  );
}

export default DashBoard;
